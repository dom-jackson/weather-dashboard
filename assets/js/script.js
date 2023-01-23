var apiKey = "63718705765f3e9e7c9f8cdfef04a1fe";
var searchList = document.getElementById("search-list");
var searchResult = document.getElementById("search-location");
var fiveDay = document.getElementById("five-day-forecast");
var lat;
var lon;
var submitButton = document.getElementById("search-btn");
var data;

submitButton.addEventListener("click", function () {
  searchInput = document.getElementById("search-bar").value;
  geocodingLocation(); //add in geocoding function parameter when ready
  console.log("clicked");
});

function geocodingLocation() {
  var requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchInput +
    "&limit=1&appid=" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
      lat = data[0].lat;
      lon = data[0].lon;
      searchlocationForecast();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function searchlocationForecast() {
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  fetch(requestUrl)
    .then(function (response) {
      return (data = response.json());
    })
    .then(function (data) {
      console.log(data);
      if (data && data.city && data.city.name) {
        cityName = data.city.name;
      } else {
        console.log("City name not found");
      }

      let currentDate;
      let forecastForEachDay = {};

      for (let i = 0; i < data.list.length; i++) {
        let date = new Date(data.list[i].dt_txt);
        let formattedDate =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();

        if (formattedDate !== currentDate) {
          currentDate = formattedDate;
          forecastForEachDay[currentDate] = data.list[i];
        }
      }
      let firstForecast = true;
      for (let date in forecastForEachDay) {
        let forecast = forecastForEachDay[date];
        let weatherIcon = forecast.weather[0].icon;
        let maxTemp = forecast.main.temp_max;
        let windSpeed = forecast.wind.speed;
        let weatherHumidity = forecast.main.humidity;
        let forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
      
        if (firstForecast) {
          var currentWeather = document.createElement("div");
          currentWeather.innerHTML = `<h2>${cityName} ${forecastDate}</h2><img src=${weatherIcon}> <p>Max Temp: ${maxTemp}*C</p> <p>Wind Speed: ${windSpeed} m/s</p> <p>Humidity: ${weatherHumidity}%</p>`;
          searchResult.appendChild(currentWeather);
          firstForecast = false;
        } else {
          var fiveDayWeather = document.createElement("div");
          fiveDayWeather.innerHTML = `<h2>${forecastDate}</h2><img src=${weatherIcon}> <p>Max Temp: ${maxTemp}*C</p> <p>Wind Speed: ${windSpeed} m/s</p> <p>Humidity: ${weatherHumidity}%</p>`;
          fiveDay.appendChild(fiveDayWeather);
        }
      }
      console.log(forecastForEachDay);
    });
}
