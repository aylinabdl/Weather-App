const apiKey = "f817b989fdd3dd6aa8192651f7e2c4da";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
let day = document.querySelector(".date-dayname");
let date = document.querySelector(".date-day");

searchBox.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    let weather = checkWeather(searchBox.value);
  }
});

let dayOfWeek = (dt = new Date().getTime()) => {
  return new Date(dt).toLocaleDateString("en-EN", { weekday: "long" });
};
let currentDay = () => {
  return new Date().getDate();
};
let currentDate = () => {
  return new Date().toLocaleDateString("en-En", { month: "short" });
};
let currentYear = () => {
  return new Date().getFullYear();
};

day.textContent = dayOfWeek();
date.textContent = currentDay() + " " + currentDate() + " " + currentYear();

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Dizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
