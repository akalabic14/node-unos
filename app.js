
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Entry = require('./index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    Entry.findAll()
    .then(entries => res.json(entries))
})

app.post('/', (req,res) => {
    let formData = req.body
    formData.time = new Date()
    Entry.create(formData)
    res.send('read')
    


    console.log(formData.time)})


app.listen(3000, () => console.log('app is running'))

