import { createLogger, format, transports } from 'winston';
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

// Extend logger with `success` method
export const logger = Object.assign(baseLogger, {
  success: (msg: string) => baseLogger.info(`✅ ${msg}`),
});
