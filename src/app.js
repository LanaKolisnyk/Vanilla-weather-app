let date = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let formattedDate = `${currentDay}, ${currentHours}:${currentMin}`;

  return formattedDate;
}
let today = document.querySelector("#today");
today.innerHTML = `${formatDate(date)}`;

let celsiusTemperature = null;
function cityWeather(response) {
  console.log(response.data);

  let location = document.querySelector("#location");
  location.innerHTML = response.data.name;
  let tempNow = document.querySelector("#tempnow");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  tempNow.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let weatherDescription = document.querySelector("#wea-dis");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let apiKey = "0593e3b15bfef2927adfa7fe26b2d02e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(cityWeather);

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "0593e3b15bfef2927adfa7fe26b2d02e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityWeather);
}
let citySearch = document.querySelector("#searchbutton");
citySearch.addEventListener("click", displayCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#tempnow");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function convertToCelsius(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempnow");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
