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
  windUnitElement.innerHTML = " miles/hour";

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
}
function updateForecast(response) {
  console.log(response.data.daily[0].temperature);

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
}

function getTemperature(apiUrl) {
  axios.get(apiUrl).then(updateTemperature);
}

function getForecast(apiforecastURL) {
  axios.get(apiforecastURL).then(updateForecast);
}

function search(event, city) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city");
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.add("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.remove("boldtext");
  if (searchInputElement.value) {
    let city = searchInputElement.value;
  } else {
    let city = "Melbourne";
  }

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  getForecast(apiforecastURL);
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

let tempUnitCelsiusElement = document.querySelector("#temp-units-C");
let tempUnitFaranheitElement = document.querySelector("#temp-units-F");

tempUnitCelsiusElement.addEventListener("click", convertTempC);
tempUnitFaranheitElement.addEventListener("click", convertTempF);

let apiKey = "483ecb596o30da81tf76d2a4bf19d4a6";
let unit = "metric";
