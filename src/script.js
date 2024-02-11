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
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
}

function convertTempF(event) {
  let metricElement = document.querySelector("#temp-units-C");
  metricElement.classList.remove("boldtext");
  let imperialElement = document.querySelector("#temp-units-F");
  imperialElement.classList.add("boldtext");
  event.preventDefault();
  let cityElement = document.querySelector("#city-selected");
  let city = cityElement.innerHTML;
  let unit = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
}

function updateTemperature(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = currentTemperature;

  let weatherIconUrl = response.data.condition.icon_url;
  let weatherIconElement = document.querySelector("#current-temperature-icon");
  weatherIconElement.innerHTML = `<img src = "${weatherIconUrl}" width=120px>`;
}

function getTemperature(apiUrl) {
  axios.get(apiUrl).then(updateTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city");
  let cityElement = document.querySelector("#city-selected");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);
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
