let appId = '113635f220c270270728b9b8428dce79';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather (searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=metric&lang=fr`)
    .then(result => {
        return result.json();
    }).then(result => {
        console.log(result)
        init(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
        document.body.style.backgroundImage = 'url(ressources/pictures/clear.jpg)';
            break;

        case 'Clouds':
        document.body.style.backgroundImage = 'url(ressources/pictures/cloudy.jpg)';
            break;

        case 'Drizzle':
        case 'Mist':
        document.body.style.backgroundImage = 'url(ressources/pictures/mist.jpg)';
            break;


        case 'Rain':
        document.body.style.backgroundImage = 'url(ressources/pictures/rain.jpg)';
            break;

        case 'Thunderstorm':
        document.body.style.backgroundImage = 'url(ressources/pictures/thunderstorm.jpg)';
            break;

        case ' Snow':
        document.body.style.backgroundImage = 'url(ressources/pictures/snow.jpg)';
            break;
    
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Vents : ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = "Taux d'humidité : " + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';

    
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})


