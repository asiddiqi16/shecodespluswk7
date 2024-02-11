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

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#enter-city");
  let cityElement = document.querySelector("#city-selected");
  cityElement.innerHTML = searchInputElement.value;

  let city = searchInputElement.value;

  /*let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  getTemperature(apiUrl);*/
}

function convertTempC(tempC) {}
function convertTempF(tempF) {}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

let tempUnitCelsiusElement = document.querySelector("#temp-units-C");
let tempUnitFaranheitElement = document.querySelector("#temp-units-F");

tempUnitCelsiusElement.addEventListener("click", convertTempC);
tempUnitFaranheitElement.addEventListener("click", convertTempF);
