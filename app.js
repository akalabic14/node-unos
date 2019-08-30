
const express = require('express')

const bodyParser = require('body-parser')

const { check, validationResult } = require('express-validator/check')

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

app.post('/', [

    check('id').isLength({min: 1}).withMessage('Empty ID!'),
    check('persons').isLength({min: 1}).withMessage('Empty Persons!'),
    check('code').isLength({min: 1}).withMessage('Empty Code!')

],(req,res) => {
    
    var errors = validationResult(req)

    console.log(errors.array());

    if (!errors.isEmpty()) {
        
        Entry.findAll({limit: 5, order: [['time', 'DESC']]})
        .then(entries => res.render('index', {entries: entries, errors: errors.array()}))
        
       
    } else {
      
    let formData = req.body
    formData.time = new Date()
    Entry.create(formData)
    res.redirect('back')}
       
})

app.listen(3000, () => console.log('app is running'))

