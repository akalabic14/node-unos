
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Entry = require('./index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {

    Entry.findAll({limit: 5, order: [['time', 'DESC']]})
    .then(entries => {
        if(entries.length<5) {
            res.json(entries)
        }
        else {
            res.json(entries.slice(5))
        }
    })
    .catch(err => console.log('some error', err))
})

app.post('/', (req,res) => {
    let formData = req.body
    formData.time = new Date()
    Entry.create(formData)
    res.send('read')
    


    console.log(formData.time)})


app.listen(3000, () => console.log('app is running'))

