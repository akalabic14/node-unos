
const express = require('express')

const bodyParser = require('body-parser')
const Entry = require('./index')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('view engine', 'pug')



app.get('/', (req, res) => {

    Entry.findAll({limit: 5, order: [['time', 'DESC']]})
    .then(entries => res.render('index', {entries: entries}))
    .catch(err => console.log('some error', err))
 })

app.post('/', (req,res) => {
    let formData = req.body
    formData.time = new Date()
    Entry.create(formData)
    res.redirect('back')
       


    console.log(req.body.name)})


app.listen(3000, () => console.log('app is running'))

