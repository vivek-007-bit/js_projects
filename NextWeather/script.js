import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

//header variables
let geoLocationBtn = document.getElementById('location-btn');
let searchBar = document.getElementById('search-bar');
let searchBtn = document.getElementById('search-btn');


//weather variables
let currentWeatherIcon = document.getElementById('current-weather-icon');

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


//prediction variables
let rainProbability = document.getElementById("rain-probability");
let tempPrediction = document.getElementById("temp-prediction");
let humidityForecast = document.getElementById("humidity-prediction");


//default city
window.addEventListener("load", () => {
    getWeatherByCity("Tokyo");
});


//get weather by city name
async function getWeatherByCity(city) {
    const request = await fetch(baseURL + city + `&appid=${apiKey}`);
    response = await request.json();

    //console.log(response);
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


//trigger the getweather function by clicking enter button
document.addEventListener("keyup", function(e){

    //console.log(e.keyCode);
    const city = searchBar.value.trim();
    if (e.keyCode == 13 && city !== "") {
        getWeatherByCity(city);
    }
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


//set the value in the dom after the response is received
function setValue(response) {

    if (response.cod == 404) {
        alert("City Not found");
    }

    else {

        const condition = response.weather[0].main;
        //console.log(condition);

        //setting the weather icons
        if (condition == "Clear") {
            currentWeatherIcon.src = "/assets/icons/clear.svg";
        }

        else if (condition == "Clouds") {
            currentWeatherIcon.src = "/assets/icons/cloud.svg";
        }

        else if (condition == "Rain") {
            currentWeatherIcon.src = "/assets/icons/rain.svg";
        }

        else if (condition == "Snow") {
            currentWeatherIcon.src = "/assets/icons/snow.svg";
        }

        else if (condition == "Thunderstorm") {
            currentWeatherIcon.src = "/assets/icons/thunderstorm.png";
        }

       else if (condition == "Fog") {
            currentWeatherIcon.src = "/assets/icons/fog.svg";
        }

        else {
            currentWeatherIcon = "/assets/icons/default.png";
        }



        cityCountry.innerHTML = response.name + `, ` + response.sys.country;

        currentTemperature.innerHTML = `Temperature: ` + response.main.temp + ` °C`;
        feelsLike.innerHTML = `Feels Like: ` + response.main.feels_like + ` °C`;
        weatherStatus.innerHTML = response.weather[0].description.toUpperCase();

        clouds.innerHTML = response.clouds.all + `%`;
        humidity.innerHTML = response.main.humidity + `%`;
        windSpeed.innerHTML = response.wind.speed + ` m/s`;
        pressure.innerHTML = response.main.pressure + ` hPa`;


        //calling the forecast function
        forecast();

        //clear the previous predictions
        rainProbability.innerHTML = "";
        tempPrediction.innerHTML = "";
        humidityForecast.innerHTML = "";


    }
}


//forecast function
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

    let res = result.data[0];
    //console.log(res)

    document.getElementById("loading").style.display = "none";

    document.getElementsByClassName("forecast")[0].style.display = "flex";

    rainProbability.innerHTML = `${res.prediction.rain_tomorrow}% Chance`;

    //temp
    res.forecast.forEach(item => {
        tempPrediction.innerHTML += `
                                        <div class="card" style="width: 18rem;">
                                            <h3 class="card-title">${item.time}</h3>
                                            <div class="card-body">
                                            <h3 class="card-text">${item.temperature_c} °C</h3>
                                            </div>
                                        </div>`;
    });


    //humidity
    res.forecast.forEach(item => {
        humidityForecast.innerHTML += `
                                        <div class="card" style="width: 18rem;">
                                            <h3 class="card-title">${item.time}</h3>
                                            <div class="card-body">
                                            <h3 class="card-text">${item.humidity_percent}%</h3>
                                            </div>
                                        </div>`;
    });

}


