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

function formatForecastDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
}

function fetchForecast(coordinates) {
	let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
	let endPoint = "https://api.openweathermap.org/data/2.5/onecall?";
	let latitude = coordinates.lat;
	let longitude = coordinates.lon;
	let apiUrl = `${endPoint}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayWeatherForecast);
}

function displayCurrentWeather(response) {
	celsiusTemperature = response.data.main.temp;
	let cityElement = document.querySelector("h1");
	cityElement.innerHTML = response.data.name;
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	let descriptionElement = document.querySelector("#weather-description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = response.data.wind.speed;
	let timeElement = document.querySelector("#time");
	timeElement.innerHTML = formatDate(response.data.dt * 1000);
	let feelingElement = document.querySelector("#feels-like");
	feelingElement.innerHTML = Math.round(response.data.main.feels_like);
	let iconElement = document.querySelector("#weather-icon");
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	fetchForecast(response.data.coord);
}

function displayWeatherForecast(response) {
	let dailyForecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast-element");

	let forecastHTML = `<div class="row">`;

	dailyForecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
            <div class="col-2">
              <div class="weekday">${formatForecastDay(forecastDay.dt)}</div>
              <img
                src="https://openweathermap.org/img/wn/${
									forecastDay.weather[0].icon
								}@2x.png" height="60px" width="60px"
              />
              <span class="highest-temperature">${Math.round(
								forecastDay.temp.max
							)}°</span>
              <span class="lowest-temperature">${Math.round(
								forecastDay.temp.min
							)}°</span>
            </div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function searchCity(event) {
	event.preventDefault();
	let cityInputValue = document.querySelector("#city-input").value;
	let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
	let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
	let apiUrl = `${endPoint}q=${cityInputValue}&units=metric&appid=${apiKey}`;

	axios.get(apiUrl).then(displayCurrentWeather);
}

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCity);

let celsiusTemperature = null;

window.addEventListener("load", (event) => {
	let cityInputValue = "London";
	let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
	let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
	let apiUrl = `${endPoint}q=${cityInputValue}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayCurrentWeather);
	displayWeatherForecast();
});

function displayUserLocation(position) {
	let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	axios.get(apiUrl).then(displayCurrentWeather);
}

function fetchUserLocation() {
	navigator.geolocation.getCurrentPosition(displayUserLocation);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", fetchUserLocation);
