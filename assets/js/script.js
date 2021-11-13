// api key
const api_key = 'b24595aa58e805fb044c6ba2cad18792';

var weather_icon = "http://openweathermap.org/img/w/";

var searchFormEl = document.querySelector("#form-sidebar");
var cityNameEl = document.querySelector("#form-search-city");

// current weather elements
var cityDateEl = document.querySelector("#city-date");
var cityWeatherIcon = document.querySelector("#weather-icon");
var curTempEl = document.querySelector("#cur-temp");
var curWindEl = document.querySelector("#cur-wind");
var curHumidityEl = document.querySelector("#cur-humidity");
var curUvIndexEl = document.querySelector("#cur-uv-index");

// forecast elements fc1
var cityFc1El = document.querySelector("#city-fc1");
var iconFc1El = document.querySelector("#icon-fc1");
var tempFc1El = document.querySelector("#temp-fc1");
var windFc1El = document.querySelector("#wind-fc1");
var humidityFc1El = document.querySelector("#humidity-fc1");
// forecast elements fc2
var cityFc2El = document.querySelector("#city-fc2");
var iconFc2El = document.querySelector("#icon-fc2");
var tempFc2El = document.querySelector("#temp-fc2");
var windFc2El = document.querySelector("#wind-fc2");
var humidityFc2El = document.querySelector("#humidity-fc2");
// forecast elements fc3
var cityFc3El = document.querySelector("#city-fc3");
var iconFc3El = document.querySelector("#icon-fc3");
var tempFc3El = document.querySelector("#temp-fc3");
var windFc3El = document.querySelector("#wind-fc3");
var humidityFc3El = document.querySelector("#humidity-fc3");
// forecast elements fc4
var cityFc4El = document.querySelector("#city-fc4");
var iconFc4El = document.querySelector("#icon-fc4");
var tempFc4El = document.querySelector("#temp-fc4");
var windFc4El = document.querySelector("#wind-fc4");
var humidityFc4El = document.querySelector("#humidity-fc4");
// forecast elements fc5
var cityFc5El = document.querySelector("#city-fc5");
var iconFc5El = document.querySelector("#icon-fc5");
var tempFc5El = document.querySelector("#temp-fc5");
var windFc5El = document.querySelector("#wind-fc5");
var humidityFc5El = document.querySelector("#humidity-fc5");


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
            if (index === 0) {
                cityFc1El.textContent = moment().add(index + 1, 'days').format("L");
                iconFc1El.src = weather_icon + fcData.weather[0].icon + ".png";
                tempFc1El.textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
                windFc1El.textContent = "Wind: " + fcData.wind_speed + " mph";
                humidityFc1El.textContent = "Humidity: " + fcData.humidity + " %";
            }
            else if (index === 1) {
                cityFc2El.textContent = moment().add(index + 1, 'days').format("L");
                iconFc2El.src = weather_icon + fcData.weather[0].icon + ".png";
                tempFc2El.textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
                windFc2El.textContent = "Wind: " + fcData.wind_speed + " mph";
                humidityFc2El.textContent = "Humidity: " + fcData.humidity + " %";
            }
            else if (index === 2) {
                cityFc3El.textContent = moment().add(index + 1, 'days').format("L");
                iconFc3El.src = weather_icon + fcData.weather[0].icon + ".png";
                tempFc3El.textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
                windFc3El.textContent = "Wind: " + fcData.wind_speed + " mph";
                humidityFc3El.textContent = "Humidity: " + fcData.humidity + " %";
            }
            else if (index === 3) {
                cityFc4El.textContent = moment().add(index + 1, 'days').format("L");
                iconFc4El.src = weather_icon + fcData.weather[0].icon + ".png";
                tempFc4El.textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
                windFc4El.textContent = "Wind: " + fcData.wind_speed + " mph";
                humidityFc4El.textContent = "Humidity: " + fcData.humidity + " %";
            }
            else if (index === 4) {
                cityFc5El.textContent = moment().add(index + 1, 'days').format("L");
                iconFc5El.src = weather_icon + fcData.weather[0].icon + ".png";
                tempFc5El.textContent = "Temp: " + Math.round((Number(fcData.temp.min) + Number(fcData.temp.max))/2 *100)/100 + " F";
                windFc5El.textContent = "Wind: " + fcData.wind_speed + " mph";
                humidityFc5El.textContent = "Humidity: " + fcData.humidity + " %";
            }
            else {
                return;
            }
            
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

        // clear old content
        cityNameEl.value = "";
    } else {
        alert("Please enter a City name");
    }
};

// event listener - search button
searchFormEl.addEventListener("submit", formSubmitHandler);




// getOneCallApiData("34.0522", "-118.2437");