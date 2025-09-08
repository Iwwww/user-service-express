import { DataSourceOptions } from "typeorm";
import { DB, IS_PRODUCTION } from "@shared/utils/secrets.utils";
import { UserEntity } from "../database/entities/User";

export const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: DB.HOST,
  port: DB.PORT,
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  synchronize: !IS_PRODUCTION,
  logging: false,
  entities: [UserEntity],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
};
