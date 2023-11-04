/*
Methods to select and retrieve elements from the HTML document.
getElementById is a method used to select an element from the HTML document based on its id attribut.
querySelector is a more versatile method used to select elements based on CSS selectors.
*/

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');



/* async function retrieves weather data for a given city using the OpenWeatherMap API and updates a 
web page with the obtained weather information.
The async keyword indicates that this function will use asynchronous operations, like fetching data from an API.

*/

async function checkWeather(city){
    var city;
    const api_key = "74de14bb3a6152a4dfffb226da526828";

    //URL for requesting weather data for the specified city.

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + api_key;

    /*Make an HTTP request to the OpenWeatherMap API using the fetch function. The await keyword is used to pause execution until the fetch operation is complete. The response is then parsed as JSON using response.json() and stored in the weather_data variable. This data will contain information about the weather in the specified city.

    */
    const weather_data = await fetch (url).then(response => response.json());
    // console.log(weather_data);

    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Error");
        return;
    }

    weather_body.style.display = "flex";
    location_not_found.style.display = "none";

    /*
    .innerHTML is a property in JavaScript used to access and modify the HTML content within an HTML element
    */

    temperature.innerHTML = Math.round(weather_data.main.temp - 273.15)+"°C";

    description.innerHTML = weather_data.weather[0].description;

    humidity.innerHTML = weather_data.main.humidity + "%";

    wind_speed.innerHTML = weather_data.wind.speed + "Km/hr";

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;

        case 'Mist':
            weather_img.src = "mist.png";
            break;

        case 'Rain':
            weather_img.src = "rain.png";
            break;

        case 'Clear':
            weather_img.src = "clear.png";
            break;

        case 'Snow':
            weather_img.src = "snow.png";
            break;
    
    }

    console.log(weather_data);

}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});