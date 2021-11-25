import axios from "axios";

export function callWeatherAPI(location) {
    return axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
}
