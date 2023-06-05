// Knex config file
const config = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "pass",
    database: "test",
  },
};

module.exports = require("knex")(config);
