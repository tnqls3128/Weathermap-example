const getCurrentWeather = (lat, lon) => {
  const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ebdb7b8d75dd6259a60a18ee59df0b9d&units=metric`;

  fetch(URL)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)

    const temp = document.querySelector(".temp")
    temp.innerText = `${result.main.temp}도⚽`;

    let weatherInfo;
    const weather = document.querySelector(".weather");
    switch(result.weather[0].main) {
      case "Clear" :
        weatherInfo = "🌞 맑음";
    }
    weather.innerText = weatherInfo;

    let cityName;
    const city = document.querySelector(".city");
    switch(result.name) {
      case "Jamwon-dong":
        cityName = "🎯 역삼동";
    }
    city.innerText = cityName;

    const icon = document.querySelector(".icon");
    icon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
  });
};

const getPosion = (position) => {
  const { latitude, longitude } = position.coords;
  getCurrentWeather(latitude, longitude);
};

const errorHandle = (error) => {
  console.error(error);
};
 
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(getPosion, errorHandle);
} else {
  console.log("geolocation is not available")
}