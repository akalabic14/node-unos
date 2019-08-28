const Sequelize = require('sequelize');
const EntryModel = require('./models/entry')

const sequelize = new Sequelize('db_unos', 'db_user', 'db_unos_pass', {
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

sequelize
.authenticate()
.then(() => console.log('conn success'))
.catch(err => console.error('unable to connect', err))

sequelize
.sync()
.then(() =>console.log('Databas & tables created') )
.catch(err => console.log('something wrong', err))


module.exports =  Entry 