// api key
const api_key = 'b24595aa58e805fb044c6ba2cad18792';

var weather_icon = "http://openweathermap.org/img/w/";

var searchFormEl = document.querySelector("#form-sidebar");
var historyEl = document.querySelector("#history");
var cityNameEl = document.querySelector("#form-search-city");

// current weather elements
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
                response.json().then(function (data) {
                    // console.log(data);
                    getCurWeather(data.name, data.main.temp, data.wind.speed, data.main.humidity, data.clouds.all, data.weather[0].icon);
                    getOneCallApiData(data.coord.lat, data.coord.lon);
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
                response.json().then(function(data) {
                    console.log(data);
                    getForecast(data);
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
        cityDateEl.textContent = city_name + " (" + moment().format("L") + ")";
        cityWeatherIcon.src = weather_icon + cur_icon + ".png";
        curTempEl.textContent = "Temp: "+ cur_temp + "F";
        curWindEl.textContent = "Wind: "+ cur_wind_speed + "mph";
        curHumidityEl.textContent = "Humidity: "+ cur_humidity + "%";
        curUvIndexEl.textContent = "UV Index: "+ cur_clouds;
    }
};

// get forecast for the next 5 days
var getForecast = function (data) {
    if (getForecast) {
        for (let index = 0; index < 5; index++) {
            var fcData = data.daily[index];
            // theIndex used to match the index of the API that starts with zero, but the HTML element ID's start with a 1 for the 1st day forecast.
            var theIndex = index  +1;
            document.querySelector("#city-fc" + theIndex).textContent = moment().add(index + 1, 'days').format("L");
            document.querySelector("#icon-fc" + theIndex).src = weather_icon + fcData.weather[0].icon + ".png";
            document.querySelector("#temp-fc" + theIndex).textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
            document.querySelector("#wind-fc" + theIndex).textContent = "Wind: " + fcData.wind_speed + " mph";
            document.querySelector("#humidity-fc" + theIndex).textContent = "Humidity: " + fcData.humidity + " %";
        }
    }
};

// form search handler function
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);

        var getBtnEl = document.getElementById(cityName);

        // if city already doesn't exist in the search history then create new button
        if (!getBtnEl) {
            createSearchHistory(cityName);
        }

        // clear old content
        cityNameEl.value = "";
    } else {
        alert("Please enter a City name");
    }
};

// create search history button elements
var createSearchHistory = function(city) {
    // create button dynamically
    var historySearchEl = document.createElement("button");
    historySearchEl.type = "button";
    historySearchEl.id = city;
    historySearchEl.classList = "btn btn-secondary btn-block";
    historySearchEl.textContent = city;
    historyEl.appendChild(historySearchEl);

    // add event listener for search history buttons
    historySearchEl.onclick = formButtonHandler;
};

// search history buttons event handler
var formButtonHandler = function() {
    getWeatherData(this.textContent);
};

// event listener - search button
searchFormEl.addEventListener("submit", formSubmitHandler);