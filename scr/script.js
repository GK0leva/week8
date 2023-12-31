//DATE

function formatDate (timestamp) {
  let date = new Date (timestamp);
  let hours = date.getHours ();
  if (hours<10){
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes<10){
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    " Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  let day = days [date.getDay()];
  return `${day} ${hours}:${minutes}`;
} 
//FORECAST

function formatDay(timestamp) {
  let date=new Date (timestamp *1000);
  let day = date.getDay ();
  let days = ["Sun","Mon","Tue","Wed", "Thu", "Fri", "Sat"];


  return days[day];
}

function displayForecast (response){
  let forecast =response.data.daily;
console.log (response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach (function (forecastDay, index) {

    if (index < 6) {

forecastHTML = forecastHTML +
 `
<div class="col-2">
  <div class="weather-forcast-date">${formatDay(forecastDay.dt)}
</div>
  <img src="https://openweathermap.org/img/wn/${forecastDay.weather [0].icon}@2x.png"
   alt=""
   width="36">
   <br>
   <div class="weather-forecast-temperature"> 
    <span class="weather-forecast-temperature-max" > ${Math.round(forecastDay.temp.max)}°
    </span>
    <span class="weather-forecast-temperature-min" > ${ Math.round(forecastDay.temp.min)}°
    </span>
  </div>
</div>
`;
}
});

forecastHTML=forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;
}



//WEATHER

function getForecast(coordinates) {
  console.log (coordinates);

  let apiKey="b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log (apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement= document.querySelector("#temperature");
  let cityElement= document.querySelector("#city");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let feelsElement= document.querySelector("#feels");
  let windElement= document.querySelector("#wind");
  let dateElement=document.querySelector("#date");
  let iconElement=document.querySelector("#icon");
  let speedWind=

  celsiusTemperature= response.data.main.temp;

  temperatureElement.innerHTML=Math.round (celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  feelsElement.innerHTML= Math.round(response.data.main.feels_like);
  windElement.innerHTML=Math.round(response.data.wind.speed/1.609);
  dateElement.innerHTML=formatDate(response.data.dt*1000);

  iconElement.setAttribute ("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast (response.data.coord);
  
}


//FORM

function search (city){
  let apiKey="b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search (cityInputElement.value);

}


let form =document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//UNIT CONVERSION 

function displayFahrenheitTemperature (event) {
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusLink.classList.remove ("active");
  fahrenheitLink.classList.add ("active");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+23;
  temperatureElement.innerHTML=Math.round (fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement =document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
  
}

let celsiusTemperature=null;

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);









search ("London");
