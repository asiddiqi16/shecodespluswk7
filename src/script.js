function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function convertTempC(event) {
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.add("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.remove("boldtext");
  event.preventDefault();
  let cityElement = document.querySelector("#city-selected");
  let city = cityElement.innerHTML;
  let windUnitElement = document.querySelector("#wind-unit");
  windUnitElement.innerHTML = " km/hr";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  getForecast(apiforecastURL);
}

function convertTempF(event) {
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.remove("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.add("boldtext");
  event.preventDefault();
  let cityElement = document.querySelector("#city-selected");
  let city = cityElement.innerHTML;

  let windUnitElement = document.querySelector("#wind-unit");
  windUnitElement.innerHTML = " miles/hr";

  let unit = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  getForecast(apiforecastURL);
}

function updateTemperature(response) {
  let cityElement = document.querySelector("#city-selected");
  cityElement.innerHTML = response.data.city;

  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = currentTemperature;

  let weatherIconUrl = response.data.condition.icon_url;
  let weatherIconElement = document.querySelector("#current-temperature-icon");
  weatherIconElement.innerHTML = `<img src = "${weatherIconUrl}" width=120px>`;

  let todaysCondition = response.data.condition.description;
  let todaysConditionElement = document.querySelector("#todays-weather");
  todaysConditionElement.innerHTML = todaysCondition;

  let currentHumidity = Math.round(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = " " + currentHumidity + " ";

  let currentWind = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = " " + currentWind + " ";

  let todaysDate = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#current-date");

  dateElement.innerHTML = formatDate(todaysDate);
}

function formatDay(timestamp) {
  let todaysDate = new Date(timestamp * 1000);
  let forecastDays = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
    "Sun",
  ];
  return forecastDays[todaysDate.getDay()];
}
function updateForecast(response) {
  console.log(response);
  let currentHighTemperature = Math.round(
    response.data.daily[0].temperature.maximum
  );
  let temperatureHighElement = document.querySelector("#high-temp");
  temperatureHighElement.innerHTML = currentHighTemperature;

  let currentLowTemperature = Math.round(
    response.data.daily[0].temperature.minimum
  );
  let temperatureLowElement = document.querySelector("#low-temp");
  temperatureLowElement.innerHTML = currentLowTemperature;

  let forecast = document.querySelector("#weather-forecast");
  let forecastDays = ["Sun", "Mon", "Tues", "Wed", "Thurs"];
  let forecastHTML = "";
  day = response.data.daily;

  for (let i = 1; i < 6; i++) {
    forecastHTML =
      forecastHTML +
      `
  <div class="row">
    <div class="col-2">
      <ul>
        <li class="forecast-element">
          <span class="forecastday">${formatDay(day[i].time)}</span>
        </li>
        <li class="forecast-element">
          <span class="forecast-weather-icon"><img src = "${
            day[i].condition.icon_url
          }" width=80px></span>
        </li>
        <li class="forecast-element">
          <span class="high-temp-forecast">${Math.round(
            day[i].temperature.maximum
          )} </span>°
          <span class="low-temp-forecast">${Math.round(
            day[i].temperature.minimum
          )}</span>°
        </li>
      </ul>
    </div>
  </div>`;
  }
  forecast.innerHTML = forecastHTML;
}

function getTemperature(apiUrl) {
  axios.get(apiUrl).then(updateTemperature);
}

function getForecast(apiforecastURL) {
  axios.get(apiforecastURL).then(updateForecast);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city");
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.add("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.remove("boldtext");

  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  getForecast(apiforecastURL);
}
function pageRefresh(city) {
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.add("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.remove("boldtext");

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  getForecast(apiforecastURL);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

let tempUnitCelsiusElement = document.querySelector("#temp-units-C");
let tempUnitFaranheitElement = document.querySelector("#temp-units-F");

tempUnitCelsiusElement.addEventListener("click", convertTempC);
tempUnitFaranheitElement.addEventListener("click", convertTempF);

let apiKey = "483ecb596o30da81tf76d2a4bf19d4a6";
let unit = "metric";

pageRefresh("Melbourne");
