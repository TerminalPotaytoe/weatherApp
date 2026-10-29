const key = 'S23BD3EHT7XQVDEGZY9SHWM9L'

const weatherForm = document.querySelector('#weatherForm');
const weatherInfo = document.querySelector('#weatherInfo');
const loader = document.querySelector('.loader');

function getInput() {
    const location = document.getElementById('country').value.trim();
    const unit = document.querySelector('input[name="unit"]:checked').value;
    return { location, unit };
}

async function getWeatherData(location, key, unit) {
    try {
        loader.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        const unitname = unit === 'C' ? 'metric' : 'us';
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}&unitGroup=${unitname}`);
        
        console.log(`Status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    }
    catch (err) {
        console.log(err.message);
        throw err;
    }
    finally{
        loader.classList.add('hidden');
        weatherInfo.classList.remove('hidden');
    }
}



async function renderWeatherData(location, key, unit) {
    const weatherData = await getWeatherData(location, key, unit);
    const today = weatherData.days[0];

    weatherInfo.classList.remove('hidden');

    document.getElementById('location').textContent = weatherData.resolvedAddress;
    document.getElementById('conditions').textContent = today.conditions;
    document.getElementById('description').textContent = today.description;
    document.getElementById('temp').textContent = `Temp: ${today.temp}°${unit}`;
    document.getElementById('tempmax').textContent = `High: ${today.tempmax}°${unit}`;
    document.getElementById('tempmin').textContent = `Low: ${today.tempmin}°${unit}`;
    document.getElementById('humidity').textContent = `Humidity: ${today.humidity}%`;
    document.getElementById('sunrise').textContent = `Sunrise: ${today.sunrise}`;
    document.getElementById('sunset').textContent = `Sunset: ${today.sunset}`;
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const {location, unit} = getInput();
    renderWeatherData(location, key, unit);
})

