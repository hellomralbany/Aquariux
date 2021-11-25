import React from "react";
import "./searchbar.css";

export default class Searchbar extends React.Component {
    constructor(props) {
        super(props);
    }

    onCityInputChange($e) {
        this.props.onCityInputChange($e.target.value);
    }

    onCountryInputChange($e) {
        this.props.onCountryInputChange($e.target.value);
    }

    clearInputs($e) {
        $e.preventDefault();
        this.props.clearInputFields();
    }

    onFormSubmit($e) {
        $e.preventDefault();
        if (this.props.city || this.props.country) {
            this.props.fetchWeather();
        }
    }

    render() {
        return (
            <>
                <form className="search_form" onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="input_wrapper">
                        <label htmlFor="city">City:</label>
                        <input className="search_input" name="city" value={this.props.city} onChange={this.onCityInputChange.bind(this)}></input>
                    </div>
                    <div className="input_wrapper">
                        <label htmlFor="country">Country:</label>
                        <input className="search_input" name="country" value={this.props.country} onChange={this.onCountryInputChange.bind(this)} maxLength={2} minLength={2}></input>
                    </div>
                    <div className="button_wrapper">
                        <button className="btn" type="submit">Search</button>
                        <button className="btn" type="clear" onClick={this.clearInputs.bind(this)}>Clear</button>
                    </div>
                </form>
            </>
        )
    }

}