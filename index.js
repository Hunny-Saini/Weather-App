let latVal;
let longVal;
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const latitude = document.getElementById("lat");
const longitude = document.getElementById("long");
const loca = document.getElementById("location");
const lati = document.getElementById("lati");
const longi = document.getElementById("longi");
const timezone = document.getElementById("time-zone");
const windSpeed = document.getElementById("windspeed");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const windDirection = document.getElementById("wind-dir");
const uv = document.getElementById("uv");
const feelsLike = document.getElementById("feels-like");

document.getElementById("fetchData").addEventListener("click",() =>{

    document.getElementById("LandingPage").style.display = "none"
    document.getElementById("infopage").style.display = "block"

    getLocation();
});

//getting location from Gio-API
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latVal = position.coords.latitude; 
    longVal = position.coords.longitude;
    console.log(latVal);
    console.log(longVal);
    latitude.innerText = latVal + "\u00B0";
    longitude.innerText = longVal + "\u00B0";
    document.getElementById("map").setAttribute("src",`https://www.google.com/maps/embed/v1/place?key=AIzaSyDdK90QjLAmTrjXrr7OvosBkcOFIswmXCs&q=${latVal},${longVal}`);
    getWeather(latVal,longVal);
    getUv(latVal,longVal);
}


const getWeather = async(latVal,longVal) => {
    console.log(latVal);
    console.log(longVal);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latVal}&lon=${longVal}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return setVal(data);
}

const getUv = async(latVal,longVal) => {
    const url = `https://api.openweathermap.org/data/2.5/uvi?lat=${latVal}&lon=${longVal}&appid=3265874a2c77ae4a04bb96236a642d2f`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return setUv(data);
}

function setVal(data){
    lati.innerText = data.coord.lat + "\u00B0";
    longi.innerText = data.coord.lon + "\u00B0";
    loca.innerText = data.name;
    timezone.innerText = data.timezone;
    windSpeed.innerText = data.wind.speed + "km/h";
    pressure.innerText = data.main.pressure + "mb";
    humidity.innerText = data.main.humidity + "%";
    windDirection.innerText = data.wind.deg;
    // uv.innerText = ;
    feelsLike.innerText = data.main.feels_like + "\u00B0C";
} 

function setUv(data){
    uv.innerText = data.value;
}