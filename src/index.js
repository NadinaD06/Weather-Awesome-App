function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
						forecastDay.weather[0].icon
					}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
						forecastDay.temp.max
					)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
						forecastDay.temp.min
					)}° </span>
        </div>
      </div>
  `;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
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

	getForecast(response.data.coord);
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
