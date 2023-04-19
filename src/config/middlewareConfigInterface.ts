export interface AppMiddlewareConfig {
  cors: Cors;
  logger: Logger;
}

export interface Cors {
  origin: boolean | string;
  credentials: boolean;
}

export interface Logger {
  common: LoggerCommon;
  dev: LoggerDev;
}

export interface LoggerCommon {
  index: string;
  flags: LoggerCommonFlag;
}

export interface LoggerCommonFlag {
  flags: string;
}

export interface LoggerDev {
  index: string;
}
