const apiKey = "9b1af2e9899e5eb80b35a6d18b52427c";
let city;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector('.weather-condition')
const main = document.querySelector('.main');
let position = document.querySelector('#current-loc')
const error = document.querySelector(".error");

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    
    const data = await response.json();
    console.log(data);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; // Hide error element



        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
        weatherCondition.innerText = data.weather[0].main;
        // main.style.background = 'no-repeat';
        main.style.objectFit = 'cover';


        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            main.style.backgroundImage = 'url(background/cloudy.jpg)';

        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            main.style.backgroundImage = 'url(background/clear.jpg)';

        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            main.style.backgroundImage = 'url(background/rainy.jpg)';

        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            main.style.backgroundImage = 'url(background/drizzle.jpg)';

        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            main.style.backgroundImage = 'url(background/mist.jpg)';

        } else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/smoke.png";
            main.style.backgroundImage = 'url(background/smoky.jpg)';

        } else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.png";

            main.style.backgroundImage = 'url(background/haze.webp)';

        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";

            main.style.backgroundImage = 'url(background/snow.jpg)';
         
        }

        // Set body background properties to fill the entire page
    document.body.style.background = 'no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    
    }



}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// FOR USER LOCATION
const geoLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        position.innerHTML = `Geolocation not supported by browser.`
    }
}

const showPosition = async (posdata) => {
    console.log(posdata)
    let lat = posdata.coords.latitude;
    let lon = posdata.coords.longitude;

    const posurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const posresp = await fetch(posurl);
    const poscity = await posresp.json();
    console.log(poscity.city);
    city = poscity.city;
    checkWeather(city);
}

position.addEventListener('click', geoLocation);
