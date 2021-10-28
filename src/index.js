function showCurrentTime() {
  //this function shows the current date and time
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusrday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let weekDay = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${weekDay} ${hour}:${minute}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row`;
  forecastHTML = forecastHTML + `
<div class="col-2">
  <div class="weather-forecast-date">
    Mon
    </div>
  <img src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-02-1024.png"
alt=""
width="42"     
/>
<div class="weather-forecast-temperatures">
<span class="weather-forecast-temperature-max">
 18° 
 <span class="weather-forecast-temperature-min">
   12°
 </span>
    </div>
</div>`;
  forecastHTML = forecastHTML = `
<div class="col-2">
  <div class="weather-forecast-date">
    Mon
    </div>
  <img src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-02-1024.png"
alt=""
width="42"     
/>
<div class="weather-forecast-temperatures">
<span class="weather-forecast-temperature-max">
 18° 
 <span class="weather-forecast-temperature-min">
   12°
 </span>
    </div>
</div>
`
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCityAndTemp(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

function accessCity(event) {
  //this function shows the city name of the city that was entered
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityAndTemp);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = 68;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = 17;
}
let currentTime = document.querySelector("#current-time"); //these two lines shows the current time
currentTime.innerHTML = showCurrentTime();

let form = document.querySelector("form"); //these two lines access the city entered
form.addEventListener("submit", accessCity);

let showCelsius = document.querySelector("#Celsius");
showCelsius.addEventListener("click", convertToCelsius);

let showFahrenheit = document.querySelector("#Fahrenheit");
showFahrenheit.addEventListener("click", convertToFahrenheit);

displayForecast();