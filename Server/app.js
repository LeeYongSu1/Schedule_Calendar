const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')
const dbInfo = require('../DB/dbInfo')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post('/reg', (req, res) =>{
     const title = req.body.title;
     const day = req.body.day;
    const date = req.body.date;
    const cat = req.body.cat;
    const sts = req.body.sts;
    const refer = req.body.refer;
    console.log(day);
    const client = new Client(dbInfo)
    client.connect()
    
    client.query('INSERT INTO public."schedule" VALUES ($1 ,$2, $3, $4, $5, $6)',[title,day, date, cat, sts, refer],(err, result)=>{
        if(err){
            console.log('Error', err)
        }else{
            res.send('OK')
        }
    })
})

app.post('/load', (req, res)=>{
    const date = req.body.date;
    
    const client = new Client(dbInfo)
    client.connect()
    // client.query('SELECT * FROM public."schedule" where to_char(date, $1) = $2',['YYYY-MM-DD', date],(err, result)=>{
    //     res.send(result.rows);
    // })
    client.query(`SELECT title, day, TO_CHAR(date,'YYYY-MM-DD 00:00') AS date, state, category, refer FROM public."schedule"`,(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.rowCount > 0){
                res.send(result.rows);
                console.log(result.rows);
            }
            else
                res.send('0');
        }
    })
})
app.post('/del', (req, res)=>{

    const title = req.body.title;
    const day = req.body.day;
    const date = req.body.date+':00';
    const cat = req.body.cat;
    const sts = req.body.sts;
    const refer = req.body.refer;
   console.log("title" + title); 
   console.log("day" + day); 
   console.log("date" + date); 
   console.log("cat" + cat); 
   console.log("sts" + sts); 
   console.log("refer" + refer); 
    const client = new Client(dbInfo)
    client.connect()
    client.query('DELETE FROM public."schedule" WHERE title= $1 AND day = $2 AND date = $3 AND category = $4',[title,day,date,cat], (err, result)=>{
        if(err){
            console.log('Error',err)
        }else{
            res.send('OK')
        }
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Start Server On Port 3000')
})



function db_Connected(){
    const client = new Client(dbInfo)
    
    client.connect()
    .then(()=>{
        console.log('connection ok')
    })
    .catch((err)=>{
        console.log('error',err)
    })

}

function db_Select(){

}

function db_Insert(){

}

function db_Delete(){

}

function db_Update(){

}
