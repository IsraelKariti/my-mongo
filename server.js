const express = require('express');  
const cors = require("cors");
const nanoid  = require('nanoid'); // nanoid instead of uuid because it uses capital letters like bit.ly 
const mongoose = require('mongoose'); 

const app = express();  // create the api level 
app.use(cors()); // fix bug "Acess to fetch has been block by CORS policy sponse to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."

const customNanoid = nanoid.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7); 

// create connection to db
let uri = 'mongodb+srv://israelkariti:dbBD7aTTxFdR2kdb@cluster0.b6lcjql.mongodb.net/shortener'
mongoose.connect(uri); 
const db = mongoose.connection;
db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log('connected to db'));

app.use(express.json()); // make express parse json
app.use(express.urlencoded({extended: true}))

// listen to port decided by environment variable or default to 3000 if local
const port = process.env.port || 3000;
app.listen(port, ()=>console.log('server started'));

app.get('/:id', (req, res)=> {

    const id = req.params.id;

    db.collection('urls')
        .findOne({nanoid: id}, function(err, result){
            if (err) throw err;

            let redirectUrl = 'https://' + result.long;
            res.redirect(redirectUrl);
        })
        .catch(()=>{// if findOne didn't find
            res.status(404).json({error: 'id '+id+' could not be found'})
        });
})

app.post('/create', (req, res)=> {

    let url = req.body.url;// get the long url from the body

    // generate shortened url - 7 alphanumerics
    // collision probability for rate of 1K/hr is 1% after 2 weeks (rare enough for this project)
    let shorturl = customNanoid();

    db.collection("urls")
        .insertOne({nanoid: shorturl, long: url})
        .then((result)=>{
            //shorturl = 'localhost:3000/' + shorturl 
            res.status(200).json({short: shorturl})
        })
        .catch(()=>{
            res.status(500).json({error: 'couldnt create new document'})
        });
})

app.get('/', (req, res)=> {
    res.send("Welcome humans");
});