const apiKey = "531da8e570c3e2d74542cabe2807c0a3";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.getElementById("search-btn");

const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels-like");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");
const pressure = document.getElementById("pressure");

const description1 = document.getElementById("description1");
const description2 = document.getElementById("description2");
const city_name = document.getElementById("city-name");
const country = document.getElementById("country");
const datetime = document.getElementById("datetime");

const coords = document.getElementById("coords");

//weather icons to be displayed
var weatherIcon;

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

  console.log(response);

  setValue(response);
}


function setValue(response) {

  if (response.cod == 404) {

    const errorContainer = document.getElementById("error-msg");
    const error = `
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>City Not Found</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
    
    errorContainer.innerHTML = error;
  }

  else {
    temp.innerHTML = response.main.temp + ` °C`;
    feels_like.innerHTML = `Feels like ` + response.main.feels_like + ` °C`;
    clouds.innerHTML = response.clouds.all + `%`;
    humidity.innerHTML = response.main.humidity + `%`;
    windspeed.innerHTML = response.wind.speed + ` m/s`;
    pressure.innerHTML = response.main.pressure + ` hPa`;

    description1.innerHTML = response.weather[0].description;

    city_name.innerHTML = `<img src="./assets/location-dot-solid-full.svg" alt="" style="width: 20px;">` + response.name + `,  ` + response.sys.country;

    coords.innerHTML = `Latitude: ` + response.coord.lat + `<span style="margin-left:10px"></span> Longitude: ` + response.coord.lon;

    const utcTime = new Date(response.dt * 1000);

    datetime.innerHTML = utcTime.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }) + `(IST)`;
    

    const summaryText = getWeatherSummary(
      response.main.temp,
      response.main.humidity,
      response.clouds.all,
      response.wind.speed
    );

    description2.innerHTML = summaryText;

    weatherIcon = response.weather[0].main;
    console.log(weatherIcon);
  }

}


searchBtn.addEventListener("click", () => {
  const city = document.getElementById("search-bar").value;
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



function getWeatherSummary(temp, humidity, clouds, windspeed) {

  summary = `It is currently ${temp} °C. `;

  if (temp < 15) summary += "It's quite cold. ";
  else if (temp < 25) summary += "It's mild and comfortable. ";
  else summary += "It's warm. ";

  if (humidity > 80) summary += "The air is very humid and may feel muggy. ";
  else if (humidity > 50) summary += "Moderate humidity. ";
  else summary += "Dry air conditions. ";

  if (clouds > 70) summary += "The sky is heavily cloudy. ";
  else if (clouds > 30) summary += "Partly cloudy conditions. ";
  else summary += "Mostly clear skies. ";

  if (windspeed < 1) summary += "Wind is calm.";
  else if (windspeed < 5) summary += "Light breeze is present.";
  else summary += "It is quite windy.";

  return summary;
}

