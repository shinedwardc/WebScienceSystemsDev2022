const express = require('express')
const app = express();
const got = require("got");
const path = require("path");
const port = 3000


app.listen(port, () => {
	console.log('Listening on *:3000')
})

app.use(express.static(path.join(__dirname, '../frontend/lab4/dist/lab4')));

/*app.get('/', function (req, res) {
	res.sendFile(__dirname + "/index.html")
})

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + "/style.css")
})

app.get('/theater_wallpaper.jpg', function(req, res){
  res.sendFile(__dirname + "/theater_wallpaper.jpg")
})*/

let movieData;
let key = 'b7577ca';
async function getMovie(title) {
  if (movieData === undefined) {
    movieData = await got
      .get(
        `http://www.omdbapi.com/?apikey=${key}&t=${title}&plot=full`
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

