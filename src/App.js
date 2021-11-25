import React from "react";
import Searchbar from "./components/searchbar/searchbar";
import { callWeatherAPI } from "./components/open-weather-api/weather.js"
import CurrentWeather from "./components/current-weather/current-weather";
import SearchHistory from "./components/search-history/search-history";
import ErrorMessage from "./components/error-message/error-message";
import moment from "moment";

const DATETIMEFORMAT = "YYYY-MM-DD hh:mm A";

export default class App extends React.Component {
  recentSearch = [];
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      city: '',
      main: '',
      description: '',
      temp_max: '',
      temp_min: '',
      humidity: '',
      results: false,
      display_error: false,
      history: [],
      timestamp: ''
    }
  }

  onCityInputChange(city) {
    this.setState({
      city,
      display_error: false
    });
  }

  onCountryInputChange(country) {
    this.setState({
      country,
      display_error: false
    });
  }

  fetchWeather(city, country) {
    let location = `${this.state.city}, ${this.state.country}`;
    setTimeout(() => {
      this.retrieveWeather(location);
    }, 50);
  }

  get correspondingResults() {
    return (this.state.city === this.state.display_name && this.state.country === this.state.display_country);
  }
  addToHistory() {
    if (this.state.results && this.correspondingResults) {
      this.recentSearch.unshift(this.state);
    }
    this.setState({
      history: [...this.recentSearch]
    });
  }

  getTime() {
    return moment().format(DATETIMEFORMAT);
  }

  clearInputFields() {
    this.setState({
      city: '',
      country: '',
      display_error: false
    });
  }

  retrieveWeather(location) {
    callWeatherAPI(location).then((res) => {
      let data = res.data
      let timetaken = this.getTime()
      this.setState({
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        humidity: data.main.humidity,
        display_name: data.name,
        display_country: data.sys.country,
        city: data.name,
        country: data.sys.country,
        results: true,
        timestamp: timetaken,
        display_error: false
      });
    }).catch((e) => {
      this.setState({
        results: false,
        display_error: true
      });
    })
    setTimeout(() => {
      if (this.state.results) {
        this.addToHistory();
      };
    }, 80);

  }

  onRecentSearch = (city, country) => {
    this.setState({
      city,
      country
    });
    let location = `${city}, ${country}`;
    this.retrieveWeather(location);
  }

  modifyHistory = (value) => {
    this.setState({
      history: [],
    });
    this.recentSearch.splice(value, 1);
    this.setState({
      history: this.recentSearch
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h3 className="header">Today's Weather</h3>
        <Searchbar
          city={this.state.city}
          country={this.state.country}
          onCityInputChange={this.onCityInputChange.bind(this)}
          fetchWeather={this.fetchWeather.bind(this)}
          clearInputFields={this.clearInputFields.bind(this)}
          onCountryInputChange={this.onCountryInputChange.bind(this)}
        />
        {this.state.display_error && <ErrorMessage />}
        {this.state.results && <CurrentWeather
          weatherInfo={this.state}
        />}
        <h3 className="search_hist_header">Search History</h3>
        {<SearchHistory
          history={this.recentSearch}
          fetchWeather={this.fetchWeather.bind(this)}
          onRecentSearch={this.onRecentSearch.bind(this)}
          modifyHistory={this.modifyHistory.bind(this)}
        />}
      </div>
    );
  }
}
