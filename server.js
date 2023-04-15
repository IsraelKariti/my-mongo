
require('dotenv').config()
const express = require('express')
const app = express()  

const generateShortened = require('./shortenGenerator')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('connected to db'))

app.use(express.json())

app.listen(3000, ()=>console.log('server started'))

app.get(/^(.+)/, (req, res)=> {
    // this method should only run for requests there are of the format '/AgQ2v9E'
    // url that start with '/' only come from the browser and needs a redirect to real url
    if(req.url.substring(0,1) != '/')
        return
    
    var shorturl = req.url.substring(1)

    db.collection("shortens")
    .findOne({short: shorturl}, function(err, result){
        if (err) throw err;
        res.redirect(result.long)
    })
    .catch(()=>{// if findOne didn't find
        res.status(500).json({error: 'errrrr'})
    })
})