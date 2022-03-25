const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const jsonParser = bodyParser.json();
//const urlencodedParser = bodyParser.urlencoded({ extended: false })

const got = require("got");
const path = require("path");
const { MongoClient } = require("mongodb");
const port = 3000

const uri = "mongodb+srv://webscisystems22:klP4DfHMpwbiHNFs@cluster0.smrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);


app.listen(port, () => {
	console.log('Listening on *:3000')
})

app.use(express.static(path.join(__dirname, '../frontend/lab5/dist/lab5')));

async function post (n){
  //client.connect();
  await client.connect(); 
  console.log("database connected"); 
  const database = client.db('first_database');
  const movies = database.collection('movies');
  var movie = {
    number: n,
    title : 'movie'
  }
  console.log(movie);
  movies.insertOne(movie);
}

/*for (var i = 1; i < 101; i++){
  console.log("i: " + i);
  post(i);
  //client.disconnect();
}*/

let movieData;
let key = 'b7577ca';
//let key = '6dc23be05ebed93369af15fb980bc140';
async function getMovie(id) {
  if (movieData === undefined) {
    movieData = await got
      .get(
        `http://www.omdbapi.com/?apikey=${key}&t=${title}&plot=full`
        //`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
      )
      .json();
  }
  //console.log(movieData);
  return movieData;
}

app.get('/movie', function (req, res) {
  if (!req.query.title){
    console.log("Can't find title")
  }
  console.log(req.query.title)
  getMovie(req.query.title)
    .then((data) => {
      res.json({
        title: data.Title,
        year: data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        director: data.Director,
        writer: data.Writer,
        actors: data.Actors,
        plot: data.Plot,
        metascore: data.Metascore,
        imdbrating: data.imdbRating,
        poster: data.Poster
      });
    })
    .catch(() => res.sendStatus(500));
});


app.get('/db', async function (req, res) {
  await client.connect();
  const database = client.db('first_database');
  const movies = database.collection('movies');
  const list = movies.find({})
  .toArray(function(err,result){
    if (err){
      res.status(400).send("Error fetching the documents!");
    }
    else{
      res.json(result);
    }
  })
})

app.get('/db/:number', async function (req, res) {
  //console.log(req.params.number);
  await client.connect();
  const database = client.db('first_database');
  const movies = database.collection('movies');
  console.log(parseInt(req.params.number));
  const query = { number: parseInt(req.params.number)};
  //console.log(query);
  //const options = { projection: {_id : 1, title : 1}};
  const movie = await movies.findOne(query)
  .then((data) => {
    res.json({
      number: data.number,
      title: data.title
    })
  })
  .catch(() => res.sendStatus(500));
  //console.log(movie);
  
})


app.post('/db', jsonParser, async function (req, res) {
  await client.connect();
  //console.log('connected');
  const database = client.db('first_database');
  var movies = database.collection('movies');
  //console.log(JSON.stringify(js))
  //console.log(req.body);
  //console.log(req.body.title);
  var movieData = {
    title: req.body.title   
  }
  //console.log(movieData);
  movies.insertOne(movieData);
  //console.log('haha');
})


app.put('/db', jsonParser, async function (req,res){
  await client.connect();
  const database = client.db('first_database');
  const movies = database.collection('movies');
  var myQuery = {};
  var newValues = {$set: {title: req.body.title}}
  movies.updateMany(myQuery,newValues, function(err,result){
    if (err){
      console.log(err);
    }
    else{
      console.log('Updating all documents successful')
    }
  })
})

app.put('/db/:number', jsonParser, async function (req, res) {
  await client.connect();
  const database = client.db('first_database');
  const movies = database.collection('movies');
  //console.log(req.params.number);
  //console.log(parseInt(req.params.number));
  //console.log((req.body.title))
  var myQuery = {number: parseInt(req.params.number)};
  var newValues = {$set: {title: (req.body.title).toString()}};
  movies.updateOne(myQuery, newValues);/*{
    if (err){
      console.log(err);
    }
    else{
      console.log('updated a document!');
      //console.log(result);
    }
  })*/
})


app.delete('/db', async function (req,res){
  await client.connect();
  const database = client.db('first_database');
  const movies = database.collection('movies');
  movies.deleteMany({})
})

app.delete('/db/:number', async function (req,res){
  await client.connect();
  //console.log(req.params.number);
  const database = client.db('first_database');
  const movies = database.collection('movies');
  const query = { number: parseInt(req.params.number)};
  movies.deleteOne(query);
})