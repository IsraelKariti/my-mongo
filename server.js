
require('dotenv').config()
const express = require('express')
const app = express()  

const cors = require("cors");
app.use(cors());

const generateShortened = require('./shortenGenerator')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('connected to db'))

app.use(express.json())

app.listen(3000, ()=>console.log('server started'))

app.get(/^(.+)/, (req, res)=> {
    var shorturl = 'http://localhost:3000'+req.url;

    db.collection('shortens')
    .findOne({short: shorturl}, function(err, result){
        if (err){
            console.log('problem: '+err)
            throw err;
        } 
        console.log('result.long: '+result.long)
        res.redirect(result.long)
    })
    .catch(()=>{// if findOne didn't find
        res.status(500).json({error: 'errrrr'})
    })
})

app.post(/^(.+)/, (req, res)=> {

    console.log('req.url: '+ req.url)
    // generate shortened url
    var shorturl = generateShortened()

    // dicard the preceding '/'
    var longurl = req.url.substring(1)

    // add https if missing
    if(!longurl.includes('https'))
        longurl = 'https://'+longurl

    db.collection("shortens")
    .insertOne({short: shorturl, long: longurl})
    .then((result)=>{
        res.status(201).json({short: shorturl})
    })
    .catch(()=>{// if findOne didn't find
        res.status(500).json({error: 'couldnt create new document'})
    })
})