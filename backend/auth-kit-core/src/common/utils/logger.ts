// @utils/logger.ts
import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import 'winston-daily-rotate-file';
import { config } from '@database/config';

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const baseLogger = createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: 'logs',
      filename: '%DATE%-app.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const logger = Object.assign(baseLogger, {
  success: (msg: string) => baseLogger.info(chalk.greenBright(`✅ ${msg}`)),
  info: (msg: string) => baseLogger.info(chalk.cyan(msg)),
  warn: (msg: string) => baseLogger.warn(chalk.yellowBright(`⚠️ ${msg}`)),
  error: (msg: string) => baseLogger.error(chalk.redBright(`❌ ${msg}`)),
});
