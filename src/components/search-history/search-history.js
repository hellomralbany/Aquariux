import React from "react";
import moment from "moment";
import "./search-history.css";

export default class SearchHistory extends React.Component {
    modifiedHistory = [];
    constructor(props) {
        super(props);
    }

    searchRecent(index) {
        this.props.onRecentSearch(this.props.history[index].city, this.props.history[index].country);
    }

    removeSearch(index) {
        this.props.modifyHistory(index);
    }

    setTime(timestamp) {
        return moment(timestamp).format("HH:MM:SS A");
    }

    displayRecent() {
        return this.props.history.map((item, i) => (
            <div className="history_list" key={i}>
                <div className="item"><p>{i + 1}. {item.display_name}, {item.display_country}</p></div>
                <div className="history_right">
                    <p className="time">{this.setTime(item.timestamp)}</p>
                    <span className="searchbtn" onClick={this.searchRecent.bind(this, i)}></span>
                    <span className="delete" onClick={this.removeSearch.bind(this, i)}></span>
                </div>
            </div>
        ));
    }
    render() {
        return (
            <>
                {this.props.history.length > 0 ? this.displayRecent() : <div className="empty_history">No Record</div>}
            </>
        )
    }
}