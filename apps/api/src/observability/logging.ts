import pino from "pino";

export type LogLevel =
  | "fatal"
  | "error"
  | "warn"
  | "info"
  | "debug"
  | "trace"
  | "silent";

export type LoggerConfig = {
  logLevel: LogLevel;
  base?: Record<string, unknown>;
};

export type Logger = pino.Logger;

let logger: Logger | undefined;

export function getLogger(): Logger {
  if (!logger) {
    throw new Error("Logger accessed before initialization");
  }

  return logger;
}

export function initLogger(config: LoggerConfig): Logger {
  logger = pino({
    level: config.logLevel,
    base: config.base,
  });

  return logger;
}
