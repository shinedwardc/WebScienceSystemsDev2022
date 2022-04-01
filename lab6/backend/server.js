const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const jsonParser = bodyParser.json();
//const urlencodedParser = bodyParser.urlencoded({ extended: false })

const got = require("got");
//const axios = require("axios");
const path = require("path");
const { MongoClient } = require("mongodb");
const port = 3000

const uri = "mongodb+srv://webscisystems22:klP4DfHMpwbiHNFs@cluster0.smrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);



client
    .connect()
    .then(() => app.listen(port, () => {
        console.log('Listening on *:3000');
    }))
    .catch(console.dir);

/*app.listen(port, () => {
	console.log('Listening on *:3000')
})*/

app.use(express.static(path.join(__dirname, '../frontend/lab6/dist/lab6')));


let movieData;
let omdbkey = 'b7577ca';
let tmdbkey = '6dc23be05ebed93369af15fb980bc140';
let imdbkey = 'k_op2gj0x8'
let simklkey = '7ff430b67150b5082b8b35afc4b5a0d3b04053915329fe7280f95ca87dd9d9d3';



/*for (var i = 0; i < 100; i++){
  uploadDocuments("ratatouille");
}*/



async function uploadDocuments(title){
  /*if (!req.params.title){
    console.log("Can't find title")
  }*/
  //console.log(req.params.title)
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  getOMDB(title)
    .then((data) => {
      //console.log(data);
      let info = pipeline(data);
      //console.log(info);
      documents.insertOne(info);
    })
  //console.log('success')
  getIMDB(title)
    .then((data) => {
      let info = pipeline(data);
      documents.insertOne(info);
    })
  getTMDB(title)
    .then((data) => {
      let info = pipeline(data);
      documents.insertOne(info);
    })
    //console.log('success')
  //hardcode id for now (ratatouille imdb)
  let id = 'tt0382932'
  getSIMKL(id)
    .then((data) => {
      let info = pipeline(data);
      documents.insertOne(info);
    })
    //console.log('success')
}

function pipeline(data){
  let name;
  let year;
  //console.log(data);
  if (data.hasOwnProperty('results')){
    //console.log(data.results[0]);
    if (data.results[0].hasOwnProperty('title')){
      name = data.results[0].title;
      year = data.results[0].release_date.substring(0,4);
    }
    else if (data.results[0].hasOwnProperty('original_title')){
      name = data.results[0].original_title;
      year = data.results[0].description.substring(1,4);
    }
  }
  else if (data.hasOwnProperty('Title')){
    name = data.Title;
    year = data.Year;
  }
  else if (data.hasOwnProperty('title')){
    name = data.title;
    year = data.year;
  }
  //console.log(name);
  //console.log(year);
  var movie = {
    title: name,
    year: year
  }
  /*res.json({
    movie
  })*/
  return movie;
}

async function getOMDB(title) {
  movieData = await got
    .get(
      `http://www.omdbapi.com/?apikey=${omdbkey}&t=${title}`
    )
    .json();
  //console.log(movieData);
  return movieData;
}


async function getIMDB(title){
  movieData = await got
    .get(
      `https://imdb-api.com/en/API/SearchMovie/${imdbkey}/${title}`
    )
    .json();
  return movieData;
}

async function getTMDB(title){
  movieData = await got
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdbkey}&query=${title}`
    )
    .json();
  return movieData;
}

async function getSIMKL(id){
  movieData = await got
    .get(
      `https://api.simkl.com/movies/${id}?client_id=${simklkey}`
    )
    .json();
  return movieData;
}


/* Lab 6 API GET, POST, PUT, DEL*/
app.get('/movie', function (req,res){
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  const list = documents.find({})
  .toArray(function(err,result){
    if (err){
      res.status(400).send("Error")
    }
    else{
      res.json(result);
    }
  })
})


app.get('/movie/:title', function (req,res){
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  console.log("title: " + req.params.title);
  const query = { title: req.params.title };
  //I added an additional document out of the 400 to test this function, since the rest 400 are the same title
  const movie = documents.findOne(query)
  .then((data) => {
    console.log(data);
    res.json({
      title: data.title,
      year: data.year
    })
  })
  .catch(() => res.sendStatus(500));
})

app.post('/movie', jsonParser, function (req,res) {
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  var movieData = {
    title: req.body.title
  }
  documents.insertOne(movieData);
})

app.put('/movie', function (req,res) {
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  var myQuery = {};
  var newValues = {$set: {title: req.body.title}}
  documents.updateMany(myQuery, newValues, function(err,res){
    if (err){
      console.log(err);
    }
    else{
      console.log('Updating all documents successful');
    }
  })
})

app.put('/movie/:title', jsonParser, function (req,res) {
  const database = client.db('first_database');
  const documents = database.collection('lab6');
    var myQuery = {title: req.params.title}
    var newValues= {$set: {title: (req.body.title).toString()}};
    documents.updateOne(myQuery,newValues);  
})

app.delete('/movie', function (req,res) {
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  documents.deleteMany({})
})

app.delete('/movie/:title', function (req,res) {
  const database = client.db('first_database');
  const documents = database.collection('lab6');
  const query = { title: req.params.title }
  documents.deleteOne(query);
})

/*
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
*/

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

