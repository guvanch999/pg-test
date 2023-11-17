const conn = require('./db')
const fs = require('fs')
const axios = require('axios')
conn.connect((err) => {
    if (err) throw err;
});

async function createTableIfNotExist() {
    return new Promise((resolve, reject) => {
        conn.query(`create table if not exists rickandmorty
    (
         "id"   serial PRIMARY KEY ,
        "name"  text not null,
        "data"  jsonb
)   ;`, (err, q) => {
            if (err) {
                console.log(err)
                reject(err);
            }

            resolve(true)
        });
    })


}


async function getRichAndMortyData(page) {
    const {data} = await axios.get('https://rickandmortyapi.com/api/character?page=' + page)
    return data
}


async function writeToDb() {
    await createTableIfNotExist()
    console.log("table created")
    let page = 1
    let inf = null
    do {
        let {results, info} = await getRichAndMortyData(page)
        inf = info
        if (!results.length) break;
        let sql = `insert into rickandmorty("name","data") values 
            ${results.map(re=>`('${re.name.replaceAll("'","''")}','${JSON.stringify(re).replaceAll("'","''")}')`).join(',')}
        `
        await executeWriteSql(sql)

        console.log(`Page ${page} was wrote to db`)
        page++
    } while (inf.next)
    conn.end()
}


async function executeWriteSql(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(true)
        })
    })
}

async function dropTable() {
    return new Promise((resolve, reject) => {
        conn.query(`drop table if exists rickandmorty;`, (err, q) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            console.log("Table dropped")
            conn.end()
            resolve(true)
        });
    })
}

module.exports = {
    createTableIfNotExist,
    getRichAndMortyData,
    writeToDb,
    dropTable
}