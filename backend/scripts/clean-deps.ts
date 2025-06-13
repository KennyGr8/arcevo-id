import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { logger } from '@utils/logger';

const FIX_MODE = process.argv.includes("--fix");
const log = (...args: any[]) => logger.warn("🧹", ...args);

function safeExec(command: string, retries = 1) {
  try {
    return execSync(command, { stdio: "pipe" }).toString();
  } catch (err) {
    if (retries > 0) {
      log(`Retrying "${command}"...`);
      return safeExec(command, retries - 1);
    }
    throw err;
  }
}

function removePackage(pkg: string) {
  log(`Removing unused dependency: ${pkg}`);
  spawnSync("pnpm", ["remove", pkg], { stdio: "inherit" });
}

function upgradePackage(pkg: string) {
  log(`Upgrading ${pkg} to latest...`);
  spawnSync("pnpm", ["add", `${pkg}@latest`], { stdio: "inherit" });
}

function runDepcheck() {
  log("Running depcheck...");
  try {
    const result = safeExec("npx depcheck --json");
    const json = JSON.parse(result);
    const unused = [...(json.dependencies || []), ...(json.devDependencies || [])];
    if (unused.length) {
      log("Unused packages found:", unused.join(", "));
      if (FIX_MODE) unused.forEach(removePackage);
    } else {
      log("✅ No unused packages found.");
    }
  } catch (err) {
    logger.error("❌ depcheck failed:", err.message);
  }
}

function runTSPrune() {
  log("Checking for unused exports via ts-prune...");
  try {
    const result = safeExec("npx ts-prune");
    if (result.trim()) {
      logger.success(result);
    } else {
      log("✅ No unused exports found.");
    }
  } catch (err) {
    logger.error("❌ ts-prune failed:", err.message);
  }
}

function runUnimported() {
  log("Running unimported to find unused files...");
  try {
    const result = safeExec("npx unimported");
    console.log(result);
  } catch (err) {
    console.error("❌ unimported found unused files or failed:", err.message);
  }
}

function formatCode() {
  log("Running eslint --fix...");
  spawnSync("npx", ["eslint", ".", "--fix"], { stdio: "inherit" });

  log("Running prettier --write...");
  spawnSync("npx", ["prettier", "--write", "."], { stdio: "inherit" });
}

function checkOutdated() {
  log("Checking for outdated packages...");
  try {
    const result = safeExec("pnpm outdated --json");
    const outdated = JSON.parse(result || "[]");
    outdated.forEach((pkg: any) => {
      log(`📦 ${pkg.name}: ${pkg.current} → ${pkg.latest}`);
      if (FIX_MODE) upgradePackage(pkg.name);
    });
  } catch (err) {
    console.error("⚠️ pnpm outdated failed:", err.message);
  }
}

function removeKnownRedundantTypes() {
  const stubs = [
    "@types/bcryptjs",
    "@types/dotenv",
    "@types/express-serve-static-core"
  ];
  stubs.forEach((stub) => {
    if (fs.existsSync("node_modules/" + stub)) {
      log(`Stub "${stub}" is unnecessary — removing...`);
      removePackage(stub);
    }
  });
}

function run() {
  log("🛠 Starting full cleanup...");

  removeKnownRedundantTypes();
  checkOutdated();
  runDepcheck();
  runTSPrune();
  runUnimported();

  if (FIX_MODE) formatCode();

  log("✅ Cleanup complete.");
}

run();
