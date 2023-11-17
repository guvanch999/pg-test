"use strict";
const service = require('./service')


async function createAndFillTable() {

    await service.writeToDb()
}


createAndFillTable()