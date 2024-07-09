import dotenv from 'dotenv';
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  /*staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },*/

  production: {
    client: 'postgresql',
    connection: {
      host:     process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
