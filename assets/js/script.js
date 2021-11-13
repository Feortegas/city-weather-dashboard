// api key
const api_key = 'b24595aa58e805fb044c6ba2cad18792';

var weather_icon = "http://openweathermap.org/img/w/";

var theDate = new Date();

var searchFormEl = document.querySelector("#form-sidebar");
var cityNameEl = document.querySelector("#form-search-city");
var cityDateEl = document.querySelector("#city-date");
var cityWeatherIcon = document.querySelector("#weather-icon");
var curTempEl = document.querySelector("#cur-temp");
var curWindEl = document.querySelector("#cur-wind");
var curHumidityEl = document.querySelector("#cur-humidity");
var curUvIndexEl = document.querySelector("#cur-uv-index");

// get weather data from API
var getWeatherData = function (city) {
    var apiCurretWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + api_key;

    fetch(apiCurretWeatherUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    getCurWeather(data.name, data.main.temp, data.wind.speed, data.main.humidity, data.clouds.all, data.weather[0].icon);
                    getForecast();
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
    var apiOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={part}&units=imperial&appid=' + api_key;

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

// get current weather data
var getCurWeather = function(city_name, cur_temp, cur_wind_speed, cur_humidity, cur_clouds, cur_icon) {
    if (getCurWeather) {
        cityDateEl.textContent = city_name + " (" + theDate.getMonth() + "/" + theDate.getDay() + "/" + theDate.getFullYear() + ")";
        cityWeatherIcon.src = weather_icon + cur_icon + ".png";
        curTempEl.textContent = "Temp: "+ cur_temp + "F";
        curWindEl.textContent = "Wind: "+ cur_wind_speed + "mph";
        curHumidityEl.textContent = "Humidity: "+ cur_humidity + "%";
        curUvIndexEl.textContent = "UV Index: "+ cur_clouds;
    }
};

// get forecast for the next 5 days
var getForecast = function () {

};

// form search handler function
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);

        // clear old content
        cityNameEl.value = "";
    } else {
        alert("Please enter a City name");
    }
};

// event listener - search button
searchFormEl.addEventListener("submit", formSubmitHandler);




// getOneCallApiData("34.0522", "-118.2437");