import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

//header variables
let geoLocationBtn = document.getElementById('location-btn');
let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('search-btn');


//weather variables
let currentWeatherIcon = document.getElementById('current-weather-icon');
let currentWeatherStatus;

let cityCountry = document.getElementById('city-country');
let currentTemperature = document.getElementById('current-temperature');
let feelsLike = document.getElementById('feels-like');
let weatherStatus = document.getElementById('weather-status');


//cards varibles
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('wind-speed');
let pressure = document.getElementById('pressure');


//api variables
const apiKey = "531da8e570c3e2d74542cabe2807c0a3";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
var response;


//default city
window.addEventListener("load", () => {
    getWeatherByCity("Tokyo");
});


//get weather by city name
async function getWeatherByCity(city) {
    const request = await fetch(baseURL + city + `&appid=${apiKey}`);
    response = await request.json();

    console.log(response);
    setValue(response);
}


//get weather by location using lat, lon
async function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const request = await fetch(url);
    response = await request.json();

    //console.log(response);
    setValue(response);
}

//location btn 
geoLocationBtn.addEventListener("click", function () {
    getLocation();
});

//search btn 
searchBtn.addEventListener("click", function () {
    const city = searchBar.value.trim();
    getWeatherByCity(city);
});



//get geo location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const LAT = position.coords.latitude;
                const LON = position.coords.longitude;
                console.log(LAT, LON);
                getWeatherByLocation(LAT, LON);
            },
            function (error) {
                alert("Error: " + error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



function setValue(response) {

    if (response.cod == 404) {
        alert("City Not found");
    }

    else {

        currentWeatherStatus = response.weather[0].main;
        console.log(currentWeatherStatus);

        cityCountry.innerHTML = response.name + `, ` + response.sys.country;

        currentTemperature.innerHTML = `Temperature: ` + response.main.temp + ` °C`;
        feelsLike.innerHTML = `Feels Like: ` + response.main.feels_like + ` °C`;
        weatherStatus.innerHTML = response.weather[0].description;

        clouds.innerHTML = response.clouds.all + `%`;
        humidity.innerHTML = response.main.humidity + `%`;
        windSpeed.innerHTML = response.wind.speed + ` m/s`;
        pressure.innerHTML = response.main.pressure + ` hPa`;

    }
}



function setWeatherIcon(status) {
    if (status == 'Clouds') {
        currentWeatherIcon.src = '/assets/cloudy.png';
    }
}

setWeatherIcon(currentWeatherStatus);


//foorecast
async function forecast() {
    const client = await Client.connect("vivek007ejfb/weather_prediction_model");
    const result = await client.predict("/weather_view", {
        city: response.name,
        country: response.sys.country,
        current_temp: response.main.temp,
        feels_like: response.main.feels_like,
        temp_min: response.main.temp_min,
        temp_max: response.main.temp_max,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        wind_speed: response.wind.speed,
        wind_direction_deg: response.wind.deg,
        description: response.weather[0].description,
    });

    result.data.forEach(item => {
        console.log(item);
    });


    result.data.forEach(item => {
        const rain = item.match(/Rain Prediction:\s*(.*)/)?.[1];
      
        precipitationForecast.innerHTML = `<h3>Rain Prediction:</h3>` +  rain;
      });
}

forecast();


let precipitationForecast = document.getElementById("precipitation-forecast");
let tempertaureForecast = document.getElementById("tempertaure-forecast");
let humidityForecast = document.getElementById("humidity-forecast");