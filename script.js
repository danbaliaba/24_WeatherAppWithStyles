const API_KEY = "32852a0bf45122761fc74d972084167f";
const city = document.getElementById("locationInput");
const btn = document.getElementById("getWeatherButton");
const weatherContainer = document.getElementById("weatherContainer");
const container = document.getElementById("container");

btn.onclick = () => {
  if (city.value.trim()) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value.trim()}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        displayWeather(data);
        console.log(data);
      });
    city.value = "";
  } else {
    alert("Введите название города!");
  }
};

function displayWeather({
  name,
  main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
  weather,
  wind: { speed },
}) {
  weatherContainer.style.border = "1px solid black";
  weatherContainer.style.width = "fit-content";
  weatherContainer.style.backgroundColor = "lightgrey"

  function weatherCheck(str) {
    if (str.toLowerCase().includes("cloud")) {
      return "clouds";
    } else if (str.toLowerCase().includes("sun")) {
      return "sun";
    } else if (str.toLowerCase().includes("snow")) {
      return "snow";
    } else if (str.toLowerCase().includes("rain")) {
      return "rain";
    } else if (str.toLowerCase().includes("clear")) {
      return "clear";
    }
  }

  weatherPhoto = weatherCheck(weather[0].main);
  console.log(weatherPhoto);

  switch (weatherPhoto) {
    case "clouds":
      container.style.backgroundImage = "url('./Clouds.jpg')";
      break;
    case "sun":
      container.style.backgroundImage = "url('./sunny.jpg')";
      break;
    case "snow":
      container.style.backgroundImage = "url('./snow.jpg')";
      break;
    case "rain":
      container.style.backgroundImage = "url('./rain.jpg')";
      break;
    case "clear":
      container.style.backgroundImage = "url('./clear.jpg')";
      break;
  }
  weatherContainer.innerHTML = `
    <h2 class="pb-2">${name}</h2>

    <p><strong>Feels like: </strong>${feels_like}</p>
    <p><strong>Humidity: </strong>${humidity}</p>
    <p><strong>Pressure: </strong>${pressure}</p>
    <p><strong>Temperature: </strong>${temp}</p>
    <p><strong>Max Temperature: </strong>${temp_max}</p>
    <p><strong>Min Temperature: </strong>${temp_min}</p>
    <p><strong>Weather: </strong>${weather[0].main}</p>
    <p><strong>Wind speed: </strong>${speed}</p>
    `;
}

// btn.onclick = () => {
// const cityName = city.value.trim();
// fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
// )
//     .then((response) => response.json())
//     .then((weather) => console.log(weather));

// city.value = "";
// };
