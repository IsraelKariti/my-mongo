require('dotenv').config();
const express = require('express');
const cors = require("cors");
const nanoid  = require('nanoid'); // nanoid instead of uuid because it uses capital letters like bit.ly 
const mongoose = require('mongoose');

const app = express();  // create the api level 
app.use(cors()); // fix bug "Acess to fetch has been block by CORS policy sponse to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."

const customNanoid = nanoid.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7); 

// create connection to db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log('connected to db'));

app.use(express.json()); // make express parse json
app.listen(3000, ()=>console.log('server started'));

app.get('/:id', (req, res)=> {

    let shorturl = req.params.id;

    db.collection('urls')
        .findOne({short: shorturl}, function(err, result){
            if (err) throw err;

            let redirectUrl = 'https://' + result.long;
            res.redirect(redirectUrl);
        })
        .catch(()=>{// if findOne didn't find
            res.status(500).json({error: 'id '+shorturl+' could not be found'})
        });
})

app.post('/create', (req, res)=> {
    console.log('body: '+ req.body)
    const url = req.body.nunu;// get the long url from the body

    // dicard the preceding '/'
    let longurl = req.url.substring(1);
    
    // discard https if exist
    if(longurl.includes('https://'))
        longurl = longurl.substring(8);

    // generate shortened url - 7 alphanumerics
    let shorturl = customNanoid();

    db.collection("urls")
        .insertOne({nanoid: shorturl, long: longurl})
        .then((result)=>{
            shorturl = 'localhost:3000/' + shorturl 
            res.status(200).json({short: shorturl})
        })
        .catch(()=>{
            res.status(500).json({error: 'couldnt create new document'})
        });
})