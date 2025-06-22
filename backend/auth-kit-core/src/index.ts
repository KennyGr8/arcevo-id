import "dotenv-flow/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import passport from "@middleware/passport";
import { config } from "@database/config/app.config";
import { logger, connectRedis } from "@utils";
import { initJobModule } from "@common/queues/jobs.module";
import { connectToMongoose } fron "@database/logic";
import { errorHandler } from "@middleware/errorHandler";
import { asyncHandler } from "@middleware/asyncHandler";
import { authenticateJWT } from "@strategies/jwt.strategy";

// Routes
import routes from "@/modules"; // 🔥 All routes registered modularly

// Middlewares
import { updateSessionActivity } from "@/modules/session/middleware/updateSessionActivity";
import { HTTPSTATUS } from "@/database/config/http.config";

const app = express();
const BASE_PATH = config.BASE_PATH || "/api";

// Core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);
app.use(passport.initialize());

// Health check
app.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.status(HTTPSTATUS.OK).json({ message: "Hello Wonderful People!!!" });
  })
);

// Mount all routes under /api
routes.forEach(({ path, router }) => app.use(`${BASE_PATH}${path}`, router));

// Register all routes
app.use(BASE_PATH, routes);

// Global error handler
app.use(errorHandler);

// Start the server
async function startServer() {
  try {
    await connectRedis();
    logger.info("✅ Redis connected");

    await initJobModule(); // BullMQ jobs
    logger.info("📦 Jobs initialized");

    await connectToMongoose();

    app.listen(config.PORT, () => {
      logger.info(`🚀 NexaAuth running on http://localhost:${config.PORT} [${config.NODE_ENV}]`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

startServer();
