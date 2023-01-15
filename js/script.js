const url = "https://api.openweathermap.org/data/2.5/";
const key = "75c9f9351104bd224c6b679c31cfeca2";

const searchBar = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const d = new Date();
const clockDOM = (document.getElementById(
  "clock"
  ).innerHTML = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getUTCHours()}:${d.getMinutes()}`);

const setQuery = (e, event) => {
  if (e.keyCode == "13" || e.target.id == "searchButton")
    getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

const displayResult = (result) => {
  let city = document.getElementById("city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let temp = document.getElementById("temp");
  temp.innerText = Math.round(result.main.temp) + "°C";

  let weatherStatus = document.getElementById("weatherStatus");
  let weatherStatusLast = result.weather[0].description;
  weatherStatus.innerText =
    weatherStatusLast.charAt(0).toUpperCase() +
    weatherStatusLast.slice(1).toLowerCase();

  let tempMinMax = document.getElementById("tempMinMax");
  tempMinMax.innerText = `Minimum: ${Math.round(result.main.temp_min)}°C    
    Maksimum: ${Math.round(result.main.temp_max)} °C`;
};

searchBar.addEventListener("keypress", setQuery);
searchButton.addEventListener("click", setQuery, true);
