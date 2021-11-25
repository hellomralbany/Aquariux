import axios from "axios";

const API_KEY = "3fd0be8ca45eb247236d8342e05526b0";

export function callWeatherAPI(location) {
    return axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    );
}
