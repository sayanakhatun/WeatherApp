const apiKey = "06ffa07b9a9c446a0f77ee9393414e49"; // OpenWeather API Key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("windSpeed").innerText = data.wind.speed + " km/h";

        // Weather Icons Change
        const weatherCondition = data.weather[0].main.toLowerCase();
        let iconMap = {
            "clouds": "clouds.png",
            "clear": "clear.png",
            "rain": "rain.png",
            "drizzle": "drizzle.png",
            "mist": "mist.png"
        };

        weatherIcon.src = iconMap[weatherCondition] || "default.png";

    } catch (error) {
        alert("Error fetching weather data!");
    }
}

// Search Button Click Event
searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value.trim()); // Trim extra spaces
});
