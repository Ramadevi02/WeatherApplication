const searchButton = document.querySelector(".btn");
const cityName = document.querySelector("#inputText");
const results = document.querySelector(".display-result")

const apiKey = '1e23f03f51689a06f2ee1e51ff337e9f'

window.addEventListener('load', ()=>{
    let lat, lon;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`). 
            then(response => response.json()).then(data => {
                console.log(data);
                console.log(data.main.temp)
                getWeather(data)
            }).catch(err => console.log(err));
        })
    }
})

searchButton.addEventListener('click', ()=>{
    const cityName = inputText.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`). 
    then(response => response.json()).then(data => {
        console.log(data);
        getWeather(data);
    }).catch(err => console.log(err))
})

const getWeather = (weatherData) =>{
    results.innerHTML = `<div>
                            <div class="location mt-4">
                                <h4><i class="fa-solid fa-location-dot"></i>${weatherData.name}</h4>
                            </div>
                            <div>
                                <img class="Weather-icon" src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"}>
                                <h5 class="weather">${weatherData.weather[0].main}</h5>
                                <h6 class="desc">${weatherData.weather[0].description}</h6>
                                <h1 class="temp">${Math.round(weatherData.main.temp)}°</h1>
                                <div class="wind-container">
                                    <h6 class="speed"><i class="fa-solid fa-wind"></i>${Math.round(weatherData.wind.speed)} m/s</h6>
                                    <h6 class="humidity"><i class="fa-solid fa-droplet"></i>${weatherData.main.humidity}%</h6>
                                </div>
                                <div class="temp-container">
                                    <div class="min-temp">
                                        <p class="minTitle">min</p>
                                        <i class="fa-solid fa-cloud"></i>
                                        <h4 class="minTemp">${Math.round(weatherData.main.temp_min)}°</h4>
                                    </div>
                                    <div class="max-temp">
                                        <p class="maxTitle">max</p>
                                        <i class="fa-solid fa-cloud"></i>
                                        <h4 class="maxTemp">${Math.round(weatherData.main.temp_max)}°</h4>
                                    </div>
                                </div>
                            </div>
                        </div>`
}