const apiKey = config.MY_KEY;

const container = document.querySelector('.container');
const btnArrow = document.querySelector('.btn-arrow');
const btnSearch = document.querySelector('.btn-search');
const infoText = document.getElementById('info-text');
const inputField = document.querySelector('input');
const currentCity = document.getElementById("current-city");
const img = document.getElementById("weatherIcon");
const currentWeather = document.getElementById("current-weather");
const currentTemperature = document.getElementById("current-temperature");
const minTemperature = document.getElementById("min-temperature");
const maxTemperature = document.getElementById("max-temperature");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");

let cityData;
let error;

const errorMsg = () => {
    infoText.classList.add('active', 'error');
    infoText.innerText = "Please enter city name"
}

const loadMsg = () => {
    infoText.classList.add('active', 'pending');
    infoText.innerText = "Getting weather details...";
}

const getData = (city) => {
    loadMsg();

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(api)
        .then(res => res.json())
        .then(res => {
            cityData = res;
            fillData(cityData);
        })
        .catch(err => console.log(err));
}

const convertToCelsius = (value) => {
    return Math.floor(value - 273);
}

const fillData = (cityData) => {
    if(!error){
        container.classList.add('active');

        currentCity.textContent = cityData.name;
        currentWeather.textContent = cityData.weather[0].main;
        currentTemperature.textContent = convertToCelsius(cityData.main.temp);
        minTemperature.textContent = convertToCelsius(cityData.main.temp_min);
        maxTemperature.textContent = convertToCelsius(cityData.main.temp_max);
        humidity.textContent = cityData.main.humidity;
        windSpeed.textContent = cityData.wind.speed;

        let icon = cityData.weather[0].icon;
        img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    }
}

inputField.addEventListener('keyup', e => {
    if(e.key === "Enter" && inputField.value !== ''){
        getData(inputField.value);
    }else if(inputField.value == ''){
        errorMsg();
    }
})

btnSearch.addEventListener('click', e => {
    if(inputField.value !== ''){
        getData(inputField.value);
    }else if(inputField.value === ''){
        errorMsg();
    }
})

btnArrow.addEventListener('click', e => {
    container.classList.remove('active');
    infoText.classList.remove('active', 'error', 'pending');
    inputField.value = '';
})
