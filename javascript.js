const apiKey = 'c00916fa8976de5627e05e841fe88dbb'; // Replace with your OpenWeatherMap API key
        
async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        document.getElementById('error').innerText = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('error').innerText = error.message;
        document.getElementById('city').innerText = 'Error';
        document.getElementById('temperature').innerText = '--';
        document.getElementById('condition').innerText = '--';
        
        document.getElementById('weather-icon').className = 'fa fa-times-circle';  // Error icon
    }
}

function displayWeather(data) {
    const city = data.name;
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const iconCode = data.weather[0].main;  // We will use the main weather condition, e.g., "Clear", "Clouds"

    // Update the city name and add a badge dynamically
    const cityElement = document.getElementById('city');
    cityElement.innerHTML = `<span class="badge bg-warning">${city}</span>`;  // Adds a badge to the city name

    // Update temperature and condition
    document.getElementById('temperature').innerText = `${temperature}°C`;
    document.getElementById('condition').innerText = condition.toUpperCase();
    
    // Set the weather icon based on the condition using Font Awesome
    const iconElement = document.getElementById('weather-icon');
    
    // Map the weather conditions to Font Awesome icons
    switch(iconCode) {
        case 'Clear':
            iconElement.className = 'fas fa-sun';  // Clear sky
            break;
        case 'Clouds':
            iconElement.className = 'fas fa-cloud';  // Cloudy
            break;
        case 'Rain':
            iconElement.className = 'fas fa-cloud-showers-heavy';  // Rain
            break;
        case 'Snow':
            iconElement.className = 'fas fa-snowflake';  // Snow
            break;
        case 'Thunderstorm':
            iconElement.className = 'fas fa-bolt';  // Thunderstorm
            break;
        case 'Drizzle':
            iconElement.className = 'fas fa-cloud-drizzle';  // Drizzle
            break;
        case 'Mist':
            iconElement.className = 'fas fa-smog';  // Mist
            break;
        default:
            iconElement.className = 'fas fa-cloud-sun';  // Default icon for unknown conditions
    }
    
    document.getElementById('error').innerText = '';  // Clear any previous errors
}
