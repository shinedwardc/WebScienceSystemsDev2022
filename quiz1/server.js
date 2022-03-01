const express = require('express');
const app = express();
const got = require('got');
const fetch = require('node-fetch');

const port = 3000;

// Set root folder
app.use(express.static(__dirname));

app.listen(port, () => {
	console.log('quiz1 server listening on port ' + port);
});

let zipcodes = [];

let data;
let apikey = '9c0723a59cec2b9edeaa774538f8ed7d';

function Decimal_2(num){
    return (Math.round(num * 100)/100).toFixed(2);
}

function temp(value){
    var f = (value - 273.15) * 1.8 + 32;
    return Decimal_2(f) + ' \xB0F';
}


function getTemperature(zip){
    if (data === undefined){
        data = await got
            .get(
                `http://api.openweathermap.org/data/2.5/weather?&APPID=${apikey}&zip=${zip}`
            )
            .json();
    }
    return data;
}

let temperature;

app.post('/temperature', function (req, res) {
    const zip = req.body;
    console.log(zip);
    zipcodes.push(zip);
    res.send('zipcode is added')
    getTemperature(zip);
    .then((data) => {
        temperature = temp(data.main.temp);
        place = data.name;
        console.log(temperature);
        if (temperature < 33){
            res.write('<p>' + place + ' is freezing!</p>');
        }
        else if (temperature >= 33 && temperature <= 50){
            res.write('<p>' + place + ' is cold!</p>');
        }
        else if (temperature >= 51 && temperature <= 80){
            res.write('<p>' + place + ' is warm!</p>');
        }
        else{
            res.write('<p>' + place + ' is hot!</p>');
        }
    })
    .catch(() => res.sendStatus(500));
})

app.get('/wind', async function (req, res){
    const url = `http://api.openweathermap.org/data/2.5/weather?&APPID=${apikey}&zip=12180`
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
})