// api key
var apiKey = 'b24595aa58e805fb044c6ba2cad18792';

// get weather data from API
var getWeatherData = function (city) {
    var apiCurretWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiCurretWeatherUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                  });
            } else {
                alert("Error: OpenWeather - city not found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
        });
  };

  // get API data for Daily weather report
var getOneCallApiData = function (lat, lon) {
    var apiOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&appid=' + apiKey;

    fetch(apiOneCallUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: OpenWeather - Lat and Lon not found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Open Weather");
        });
};




getWeatherData("Los Angeles");

getOneCallApiData("34.0522", "-118.2437");