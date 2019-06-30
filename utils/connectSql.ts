// @ts-ignore
const sql = require("mssql"); // there's a bug in this lib, thats why.

async function connectToSQL() {
  const config = {
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATA_BASE_NAME,
    options: {
      encrypt: true,
    },
  };
  return await sql.connect(config);
}

export default connectToSQL;
