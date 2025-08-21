// Your OpenWeatherMap API key:
// 67f0f1d5bcda22d0df7b09b3dcfc16d0
const apiKey = "67f0f1d5bcda22d0df7b09b3dcfc16d0";

const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather(cityInput.value);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateUI(data) {
  document.querySelector(".show-weather h2").textContent =
    `${data.name}, ${data.sys.country}`;

  const date = new Date();
  document.querySelector(".show-weather p").textContent = 
    date.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  document.querySelector(".weather-name").textContent =
    data.weather[0].main;

  // Change icon dynamically
  const iconCode = data.weather[0].icon;
  document.querySelector(".weather-icon").innerHTML = 
    `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon">`;

  document.querySelector(".temp").innerHTML =
    `${Math.round(data.main.temp)}&deg;C`;

  document.querySelector(".temp-min").textContent =
    `Min: ${Math.round(data.main.temp_min)}°C`;
  document.querySelector(".temp-max").textContent =
    `Max: ${Math.round(data.main.temp_max)}°C`;

  document.querySelector(".detail-item:nth-child(1) .detail-value").innerHTML =
    `${Math.round(data.main.feels_like)}&deg;C`;
  document.querySelector(".detail-item:nth-child(2) .detail-value").textContent =
    `${data.main.humidity}%`;
  document.querySelector(".detail-item:nth-child(3) .detail-value").textContent =
    `${data.wind.speed} m/s`;
  document.querySelector(".detail-item:nth-child(4) .detail-value").textContent =
    `${data.main.pressure} hPa`;
}
