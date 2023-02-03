require("dotenv").config();
const express = require("express");
const connection = require("./src/db/connection");
const cors = require("cors");
const router = require("./src/router/router");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const { PORT, DB_USERNAME, DB_PASSWORD } = process.env;

connection(DB_USERNAME, DB_PASSWORD);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server start at port ${PORT}`);
});
