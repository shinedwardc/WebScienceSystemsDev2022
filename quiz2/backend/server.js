const express = require('express')
const got = require('got')
const path = require('path')
const { MongoClient } = require('mongodb')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const port = 3000

const app = express();

const url = "mongodb+srv://webscisystems22:klP4DfHMpwbiHNFs@cluster0.smrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(url);

client
    .connect()
    .then(() => app.listen(port, () => {
        console.log('Listening on *: 3000');
    }))
    .catch(console.dir)

app.use(express.static(path.join(__dirname, '../quiz2/dist/quiz2')));

let movieData;
let omdbkey = 'b7577ca';
const database = client.db('first_database')
const documents = database.collection('quiz2')


async function getOMDB(title) {
    movieData = await got
        .get(`http://www.omdbapi.com/?apikey=${omdbkey}&t=${title}`)
        .json();
    return movieData;
}

app.get('/mongo', function (req,res) {
    //console.log('here')
    const list = documents.find({})
    .toArray(function(err,result){
        if (err){
            res.status(400).send("Error")
        }
        else{
            res.json(result)
        }
    })
})

app.get('/mongo/:number', function (req,res) {
    const query = { number: req.params.number }
    const finding = documents.findOne(query)
    .then((data) => {
        res.json({
            title: data.title,
            votes: data.No_of_Votes,
            rating: data.IMDB_Rating
        })
    })
})

app.post('/mongo', jsonParser, function (req,res) {
    console.log(req.body.title)
    var data = getOMDB(req.body.title)
    documents.insertOne(data);
})

app.post('/mongo/:number', jsonParser, function (req,res) {
    //create a proper error with a proper error code
})

app.put('/mongo', jsonParser, function (req,res) {
    var myQuery = {};
    var newValues = {$set: {title: req.body.title }}
    documents.updateMany(myQuery, newValues, function(err,res){
        if (err){
            console.log(err);
        }
        else{
            console.log('Updating all documents successful')
        }
    })
})

app.put('/mongo/:number', jsonParser, function (req,res) {
    var myQuery = {number: (req.params.number).toString() };
    var newValues = {$set: {title: req.body.something}}
    documents.updateOne(myQuery, newValues)
})

app.delete('/mongo', function (req,res) {
    documents.deleteMany({})
})

app.delete('/mongo/:number', function (req,res){
    const query = { number: (req.params.number).toString() }
    documents.deleteOne(query)
})


