const express = require('express')
const router = express.Router()
var { DataStore } = require('notarealdb')

// RECORD STORE
var store = new DataStore('./data')
var records = store.collection('records')

router.get('/records',(req,res) =>{
    res.json(records.list())
})

router.post('/records', (req, res) => {
    var data = req.body
    records.create(data) 
    res.json(records.list())
})


module.exports = router