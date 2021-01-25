import * as dotenv from "dotenv";
dotenv.config();

import developmentConnection from "./database/connections/dev";
import productionConnection from "./database/connections/production";

const migrationsFolder = "./database/migrations";

const migrationsConfig = {
  tableName: "knex_migrations",
  directory: migrationsFolder,
};

module.exports = {
  development: {
    client: process.env.DB_TYPE,
    connection: developmentConnection,
    migrations: migrationsConfig,
  },

  production: {
    client: process.env.DB_TYPE,
    connection: productionConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: migrationsConfig,
  },
};
