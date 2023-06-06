import { knex, Knex } from "knex";
// Knex config file
const config: Knex.Config = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "pass",
    database: "test",
  },
};

const pg = knex(config);

export default pg;
