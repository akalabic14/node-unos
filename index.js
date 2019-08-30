const Sequelize = require('sequelize');
const EntryModel = require('./models/entry')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    port: 43306,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}

)

const Entry = EntryModel(sequelize, Sequelize)

//connect to database
sequelize
.authenticate()
.then(() => console.log('conn success'))
.catch(err => console.error('unable to connect', err))

//create database and table
sequelize
.sync()
.then(() =>console.log('Databas & tables created') )
.catch(err => console.log('something wrong', err))


module.exports =  Entry 