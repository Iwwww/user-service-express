import { DataSource } from "typeorm";
import { ormConfig } from "@config/database";

export const AppDataSource = new DataSource(ormConfig);
