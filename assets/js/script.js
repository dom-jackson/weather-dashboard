var apiKey ="63718705765f3e9e7c9f8cdfef04a1fe";
var searchList = document.getElementById("search-list");
var searchResult = document.getElementById("search-location");
var fiveDay = document.getElementById("five-day-forecast");
var lat;
var lon;
var submitButton = document.getElementById("search-btn");
var data;

submitButton.addEventListener('click', function(){
    searchInput = document.getElementById("search-bar").value;
    geocodingLocation()//add in geocoding function parameter when ready
    console.log("clicked");
})

function geocodingLocation() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;
    
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        lat = data[0].lat;
        lon = data[0].lon;
        searchlocationForecast();
    })
    .catch(function(error) {
        console.log(error);
    });
}

function searchlocationForecast() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon +"&appid=" + apiKey;
    fetch(requestUrl)
        .then(function(response){
            return data = response.json();
    })
    .then(function(data) {
        console.log(data);
        if(data && data.city && data.city.name) {
            cityName = data.city.name;
          } else {
            console.log("City name not found");
          }
        cityName = data.city.name;
        console.log(cityName);
        weatherIcon = data.list[3].weather[0].icon;
        console.log(weatherIcon);
        maxTemp = data.list[3].main.temp_max;
        console.log(maxTemp);
        windSpeed = data.list[3].wind.speed;
        console.log(windSpeed);
        weatherHumidity = data.list[3].main.humidity;
        console.log(weatherHumidity);

        var currentWeather = document.createElement("div");
        currentWeather.innerHTML = "City: " + cityName + "<br>" + "Weather Icon: " + weatherIcon + "<br>" + "Max Temperature: " + maxTemp + "<br>" + "Wind Speed: " + windSpeed + "<br>" + "Humidity: " + weatherHumidity;
        searchResult.appendChild(currentWeather);
    })


}