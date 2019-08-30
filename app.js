
const express = require('express')

const bodyParser = require('body-parser')

const { check, validationResult } = require('express-validator/check')

const Entry = require('./index')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.set('view engine', 'pug')


const emptyForm = {id: '', persons: '', code: ''}

app.get('/', (req, res) => {
    //read data from db and send to client
    Entry.findAll({limit: 5, order: [['time', 'DESC']]})
    .then(entries => res.render('index', {entries: entries, form:emptyForm}))
    .catch(err => console.log('some error', err))
 })

app.post('/', [
    // form validators  
    check('id').isLength({min: 1}).withMessage('Empty ID!'),
    check('persons').isLength({min: 1}).withMessage('Empty Persons!'),
    check('code').isLength({min: 1}).withMessage('Empty Code!')

  ],
  (req,res) => {

    let form = {id: req.body.id,
        persons: req.body.persons,
        code: req.body.code}
    
    let errors = validationResult(req)
    console.log(errors.array());
    
    //check if empty filds in form and handle response   
    if (!errors.isEmpty()) {
        Entry.findAll({limit: 5, order: [['time', 'DESC']]})
        .then(entries => res.render('index', {entries: entries, errors: errors.array(), form: form}))
    } else {
        let formData = req.body
        formData.time = new Date()
        //read and return data from db
        Entry.create(formData)
        .then(() => Entry.findAll({limit: 5, order: [['time', 'DESC']]}))
        .then(entries => res.render('index', {entries: entries, form: emptyForm, success: true}))
    }}
    )

app.listen(3000, () => console.log('app is running'))

