const inputEl = document.querySelector(".city-input");
const searchButtonEl = document.querySelector(".search-button");
const weatherIconEl = document.querySelector(".weather-icon img");
const tempEl = document.querySelector(".temperature");
const cityNameEl = document.querySelector(".city-name");
const humidityEl = document.querySelector(".humidity-section h4");
const windEl = document.querySelector(".wind-section h4");

const API_key = "1de0ab96bc202dbf492f9d4ed9198133";

searchButtonEl.addEventListener("click", () => {
  const city = inputEl.value.trim();
  if (!city) {
    inputEl.value = "";
    return;
  }
  getWeatherData(city);
});
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchButtonEl.click();
});
async function getWeatherData(cityName) {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`;
    const response = await fetch(API_URL);
    const result = await response.json();
    tempEl.textContent =
      Math.round((result.main.temp - 273.15) * 1.8 + 32) + "°F";
    cityNameEl.textContent = result.name;
    humidityEl.textContent = result.main.humidity + "%";
    windEl.textContent = result.wind.speed + " m/s";
    updateWeatherIcon(result.weather[0].icon);
    inputEl.value = "";
  } catch (error) {
    console.error("Unable to get weather information", error);
  }
}
function updateWeatherIcon(weatherIcon) {
  weatherIconEl.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
}

getWeatherData("Seattle");
