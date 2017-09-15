import React from 'react';
import  MyFetch from './myfetch';

class SearchStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            APIStoppoints: 'https://api.tfl.gov.uk/line/24/stoppoints',
            searchBus: "",
            transportObj: ""
        };
    }

    startSearch(e) {
        e.preventDefault();
        MyFetch.myGet(this.state.APIStoppoints).then(response => {
            this.setState({transportObj: response});
        });
    }

    setBus(e) {
        this.setState({searchBus: e.target.value});
    }

    uniqID() {
        this.uId = this.uId || 0;
        return this.uId++;
    }

    render() {
        let busNumber;

        if (this.state.transportObj.length > 0) {
            let test =[];

            busNumber = this.state.transportObj.map((item, index) => {
                // console.log(this.state.transportObj[index].lineModeGroups[0].lineIdentifier);
                if (item.commonName == this.state.searchBus) {
                    test.push(this.state.transportObj[index].lineModeGroups[0].lineIdentifier);
                    if(test.length == 1){
                        return (
                            <div className="busNumber"
                                 key={this.uniqID()}>
                                <em> Routes</em>: { test[0].join(', ')}
                            </div>
                        )
                    }
                }
                else return null;
            });
        }
        else busNumber = null;

        return (
            <div className="searchStationComponent">
                <form onSubmit={this.startSearch.bind(this)}>
                   Find a route: <input onChange={this.setBus.bind(this)}
                           type="text"
                           value={this.state.searchBus}
                           className="inputStation"
                           placeholder="enter a station"
                    />
                    <button className="btnSearch">Search</button>
                </form>
                {busNumber}
            </div>
        )
    }
}
export default SearchStation;
