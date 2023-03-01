const button = document.querySelector('.submit');
const inputValue = document.querySelector('.inputText');
const result = document.querySelector('.result');

let apiKey = '1e23f03f51689a06f2ee1e51ff337e9f';

let getWeather = () => {
    let cityValue = inputValue.value;

    if(cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
    }
    else{
        //for getting current location, get the latitude and longtitude from position
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`).
        then(response => response.json()).then(data => {
            console.log(data);
            result.innerHTML = `
                <h2 class="cname">${data.name}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                <h1 class="temp1">${Math.round(data.main.temp)}ºF</h1>
                <div class="temp-container">
                    <div>
                        <h4 class="title">min</h4>
                        <h4 class="temp">${data.main.temp_min}</h4>
                    </div>
                    <div>
                        <h4 class="title">max</h4>
                        <h4 class="temp">${data.main.temp_max}</h4>
                    </div>
                </div>
            `;
        }).catch(err => alert("wrong city name"))
    }
}
button.addEventListener('click', getWeather);
window.addEventListener('load', getWeather);
window.addEventListener('enter', getWeather)

