import React from "react";
import "./current-weather.css";


export default class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { display_country, display_name, main, description, temp_min, temp_max, humidity, timestamp } = this.props.weatherInfo
        return (
            <div className="weather_wrapper">
                <p className="weather_country">{display_name}, {display_country}</p>
                <h1 className="weather_main">{main}</h1>
                <div className="weather_details">
                    <span className="weather_labels">Description:</span> <span>{description}</span>
                    <span className="weather_labels">Temperature:</span> <span>{temp_min}&#8451; ~ {temp_max}&#8451;</span>
                    <span className="weather_labels">Humidity: </span> <span>{humidity}%</span>
                    <span className="weather_labels">Time: </span> <span>{timestamp}</span>
                </div>
            </div>
        )
    }
}