import app from "./app";
import { AppDataSource } from "./database/data-source";
import { APP_PORT } from "@shared/utils/secrets.utils";

AppDataSource.initialize()
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`server running on port: ${APP_PORT}`);
    });
  })
  .catch(console.error);
