const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')
//const dbInfo = {}//require('../DB/dbInfo')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) =>{
    res.send('Success!')
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Start Server On Port 3000')
})