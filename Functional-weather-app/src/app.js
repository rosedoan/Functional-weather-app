function formatDate(time) {
  let date = time.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let months = [
    "Jannuary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[time.getMonth()];
  let year = time.getFullYear();
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;
}

let now = new Date();
let showDate = document.querySelector(".date");
showDate.innerHTML = formatDate(now);

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    ".icon"
  ).setAttribute = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}
function search(city) {
  let units = "imperial";
  let apiKey = "577c46134c672fc2d3022ec30b750312";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("h1").value;
  search(city);
}
search("New York");

function searchWeather(position) {
  let apiKey = "577c46134c672fc2d3022ec30b750312";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchWeather);
}

let searchForm = document.querySelector("#show-city");
searchForm.addEventListener("submit", handleSubmit);

let currentWeather = document.querySelector(".fa-location-dot");
currentWeather.addEventListener("click", displayCurrentWeather);
