"use strict"
const pg = require("pg");

const fs = require("fs");
const config = {
    connectionString:
        "postgres://candidate:62I8anq3cFq5GYh2u4Lh@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1",
    ssl: {
        rejectUnauthorized: true,
        ca: fs
            .readFileSync("./root.crt")
            .toString(),
    },
};
const conn = new pg.Client(config);
module.exports = conn