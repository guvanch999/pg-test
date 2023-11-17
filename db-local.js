"use strict"
const pg = require("pg");

const fs = require("fs");
const config = {
    connectionString:
        "postgres://postgres:fib11235813@localhost:5432/test",
    // ssl: {
    //     rejectUnauthorized: true,
    //     ca: fs
    //         .readFileSync("./root.crt")
    //         .toString(),
    // },
};
const conn = new pg.Client(config);
module.exports = conn