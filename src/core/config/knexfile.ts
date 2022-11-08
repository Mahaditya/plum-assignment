import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  production: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "../database/migrations"
    },
  },
};

export default config
