function Decimal_2(num){
    return (Math.round(num * 100)/100).toFixed(2);
}

function temp(value){
    var f = (value - 273.15) * 1.8 + 32;
    return Decimal_2(f) + ' \xB0F';
}

function MetersToMiles(value){
    var m = (value * 2.236936)
    return Decimal_2(m) + ' mph';
}

function createDescription(data){
    var description = document.getElementById('description');
    var str = "";
    str += '<i class = "fas fa-wind fa-fw" style="color: #cabec0;"></i>';
    str += '<span class = "ms-1">';
    str += MetersToMiles(data.wind.speed);
    str += '</span></div>';
    str += '<div><i class = "fas fa-tint fa-fw" style="color: #d4f1f9;"></i>';
    str += '<span class = "ms-1">';
    str += data.main.humidity + '%';
    description.innerHTML = str;
}

function AddIcon(data){
    var link = "http://openweathermap.org/img/w/" + data.weather[0].icon + '.png';
    return "<img src = " + link + ">";
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(getPosition) {
        let lat = getPosition.coords.latitude;
        let long = getPosition.coords.longitude;
        let key = "9c0723a59cec2b9edeaa774538f8ed7d";
        //console.log(lat);
        //console.log(long);
        let link = 'http://api.openweathermap.org/data/2.5/weather?lat=';
        //let link2 = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric';
        link += lat;
        link += '&lon=' + long;
        link += '&appid=' + key;
        //console.log(link);
        //console.log(link2);
        $.getJSON(link, function(data) {
            //console.log(data.name);
            document.getElementById("city").innerHTML = data.name;
            var today = new Date();
            //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            //var dateTime = date+' '+time;
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var date = mm + '/' + dd + '/' + yyyy;
            document.getElementById("date").innerHTML = date;
            //console.log(data.main.temp);
            document.getElementById("temp").innerHTML = temp(data.main.temp);
            //console.log(data.weather[0].description);
            document.getElementById("status").innerHTML = data.weather[0].description;
            createDescription(data);
            document.getElementById("image").innerHTML = AddIcon(data);
            switch (data.weather[0].main) {
                case "Snow":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
                  break;
                case "Clouds":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
                  break;
                case "Fog":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
                  break;
                case "Rain":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
                  break;
                case "Clear":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                  break;
                case "Thunderstorm":
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
                  break;
                default:
                  document.getElementById("wrapper-bg").style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
                  break;
              }
        });
    });
});