async function getWeather() {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = "";

    const city = document.getElementById("cityInput").value;
    
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";
    
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const response = await fetch(`/weather/${city}`);
    const data = await response.json();
    
    loadingIndicator.style.display = "none";
    
    displayWeather(data);
}



function displayWeather(weatherData) {
    const weatherInfo = document.getElementById("weatherInfo");
    if (weatherData.error) {
        weatherInfo.innerHTML = `<p>${weatherData.error}</p>`;
    } else {
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const sunriseTimestamp = weatherData.sys.sunrise * 1000;
        const sunsetTimestamp = weatherData.sys.sunset * 1000;

        const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        weatherInfo.innerHTML = `
            <p>Temperature: ${temperature.toFixed(2)}°C</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Sunrise: ${sunriseTime}</p>
            <p>Sunset: ${sunsetTime}</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    }
}


