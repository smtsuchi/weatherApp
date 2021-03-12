const key='insert your own open weather api key here';
const getWeather = async (city) => {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    const data = await result.json();
    const myCityDetails = {
        name: data.name,
        forecast: data.weather[0].main,
        forecast_description: data.weather[0].description,
        // (0K − 273.15) × 9/5 + 32 = -459.7°F  Formula for Kelvin => Fahrenheit
        curTemp: Math.floor((data.main.temp-273.15)*(9/5)+32),
        lowTemp: Math.floor((data.main.temp_min)*(9/5)+32),
        highTemp: Math.floor((data.main.temp_max)*(9/5)+32),
        humidity: data.main.humidity
    }
    // console.log(myCityDetails)
    return myCityDetails
}
const DOM_Elements = {
    weatherDetails: '.weather-details'
};

const createList = (name, forecast, forecast_description, curTemp, lowTemp, highTemp, humidity) => {
    let bg_img;
    console.log(forecast);
    if (forecast == 'Rain'){bg_img = 'rain'} else if (forecast == 'Snow'){bg_img = 'snow'} else if (forecast == 'Clear'){bg_img = 'clear'}
    else if (forecast == 'Clouds'){bg_img = 'clouds'} else if (forecast == 'Mist'){bg_img = 'mist'} else {bg_img = 'default-img'};
    const html = 
    `<div class='container2' id='${name.toLowerCase()}'><ul class='container shoha-style ${bg_img}'>`+
        `<li><h4>${name}</h4></li>` +
        `<li><h5>${forecast}</h5></li>` +
        `<li>Forecast Description: ${forecast_description}</li>` +
        `<li>Current Temperature: ${curTemp}°F</li>` +
        `<li>Low: ${lowTemp}°F</li>` +
        `<li>High: ${highTemp}°F</li>` +
        `<li>Humidity: ${humidity}%</li>` +
        `<button type="button" class="btn-close btn-close-white close-btn" onclick="deleteSelf('${name.toLowerCase()}')" aria-label="Close"></button>`+
    "</ul></div>";
    // `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${firstName} ${lastName}</a>`;
    document.querySelector(DOM_Elements.weatherDetails).insertAdjacentHTML('beforeend', html);
};
const loadData = async (name) => {
    const myResponse = await getWeather(name);
    createList(myResponse.name, myResponse.forecast, myResponse.forecast_description, myResponse.curTemp, myResponse.lowTemp, myResponse.highTemp, myResponse.humidity);
}
const form = document.querySelector('#searchCityData');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log(event);
    let cityName = event.path[0][0].value;
    loadData(cityName);
});
const deleteSelf = (id) => {
    let myobj = document.getElementById(id);
    myobj.remove();
}
