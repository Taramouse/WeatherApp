﻿function getWeather() {

    var zipcode = $('#input-box').val();
    var queryString =
        "https://query.yahooapis.com/v1/public/yql?q=" +
        "select+*+from+weather.forecast+where+location=" +
         zipcode + "&format=json";

    $.getJSON(queryString, function (results) {
        if (results.query.count > 0) {
            var weather = results.query.results.channel;
            $('#description').text(weather.description);
            console.log(weather.description);
            console.log(weather);
            // Populate div's in index dom with data from the weather object
            var wind = weather.wind;
            var units = weather.units;
            $('#temp').text(wind.chill + units.temperature);
            $('#wind').text(wind.speed + units.speed);

            var atmosphere = weather.atmosphere;
            $('#humidity').text(atmosphere.humidity + '%');
            $('#visibility').text(atmosphere.visibility + units.distance);

            var astronomy = weather.astronomy;
            $('#sunrise').text(astronomy.sunrise);
            $('#sunset').text(astronomy.sunset);
        }

    });
}

function getLocation() {
    // Set Android specific title
    $('#app-title').text("Android Weather App");

    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });

    $('#description').text("Determining your current location ...");
    $('#get-weather').prop("disabled", true);
}

var onSuccess = function (position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log('Location found ' + latitude + ' Lat, ' + longitude + ' Long.');
    // Get zipCode by using latitude and longitude.

    var queryString = "https://query.yahooapis.com/v1/public/yql?q=" +
       "select%20*%20from%20geo.placefinder%20where%20text%3D%22" + latitude +
       "%2C" + longitude + "%22%20and%20gflags%3D%22R%22" + "&format=json";

    $.getJSON(queryString, function (results) {

        if (results.query.count > 0) {

            // Put the zip code into the input box for the user.
            var zipCode = results.query.results.Result.uzip
            $('#input-box').val(zipCode);
            console.log('Zip Code : ' + zipCode);
        }

    });

    $('#description').text("Get the Weather");
    $('#get-weather').prop("disabled", false);
}

function onError(error) {
    console.log('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
}