import { LOG_LEVEL } from "@shared/utils/secrets.utils";
import pino from "pino";

const logger = pino({
  level: LOG_LEVEL,
});

export default logger;
