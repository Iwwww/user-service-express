import express, { Application } from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import logger from "@config/logger";
import compression from "compression";
import { MainRouter as v1 } from "./routes";
import { ALLOWED_ORIGINS_CORS } from "@shared/utils/secrets.utils";
import errorHandler from "@shared/middlewares/errorHandler";

const corsOptions = {
  origin: ALLOWED_ORIGINS_CORS || ["localhost", "127.0.0.1"],
  credentials: true,
};

const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(pinoHttp({ logger }));
app.use("/v1", v1);
app.use(errorHandler);

export default app;
