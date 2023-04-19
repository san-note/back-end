import { AppMiddlewareConfig } from "@@config/middlewareConfigInterface";
import dayjs from "dayjs";

export const loggerFileName: string = `/${dayjs().format(
  "YYYY-MM-DD"
)}-access.log`;

const appMiddlewareConfig: AppMiddlewareConfig = {
  cors: {
    origin: true,
    credentials: true,
  },
  logger: {
    common: {
      index: "common",
      flags: { flags: "a" },
    },
    dev: {
      index: "dev",
    },
  },
};

export default appMiddlewareConfig;
