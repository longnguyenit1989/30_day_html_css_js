var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");

var shortDesc = document.querySelector(".short-desc");
var spanVisibility = document.querySelector(".visibility span");
var spanWind = document.querySelector(".wind span");
var spanSun = document.querySelector(".sun span");

var value = document.querySelector(".value");
var time = document.querySelector(".time");

var content = document.querySelector(".content")

function changeWeatherUI() {
  search.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=21.0285&lon=105.8542&appid=d00b395e25b7df4a1ff382b01a070f51`;

  let data = fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setDataWeather(data));
}

function setDataWeather(data) {
  if (data.cod == 200) {
    content.classList.remove('hide')
    city.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    spanVisibility.innerHTML = data.visibility + `m`;
    spanWind.innerHTML = data.wind.speed + `m/s`;
    spanSun.innerHTML = data.main.humidity;

    value.innerHTML = Math.round(data.main.temp - 273.15);
    shortDesc.innerHTML = data.weather[0] ? data.weather[0].main : "";
    time.innerHTML = new Date().toLocaleString("vi");
  } else {
    content.classList.add('hide')
  }
}

changeWeatherUI();

search.addEventListener('keydown', function(e) {
    if(e.code === 'Enter') {
        changeWeatherUI()
    }
})
