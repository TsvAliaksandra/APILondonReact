import React from 'react';
import  MyFetch from './myfetch';

class SearchBus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            APIStoppoints: 'https://api.tfl.gov.uk/line/24/stoppoints',
            searchStation: "",
            transportObj: "",
        }
    }

    startSearch(e) {
        e.preventDefault();
        MyFetch.myGet(this.state.APIStoppoints).then(response => {
            this.setState({transportObj: response});
        });

    }

    setBus(e) {
        this.setState({searchStation: e.target.value});
    }

    uniqID() {
        this.uId = this.uId || 0;
        return this.uId++;
    }

    render() {
        let arrOfName=[];

        if (this.state.transportObj.length > 0) {
          this.state.transportObj.map((item, index) => {
                return  this.state.transportObj[index].lineModeGroups[0].lineIdentifier.map((i, ind) => {
                    if (i == this.state.searchStation) {
                        arrOfName.push(item.commonName);

                        if(arrOfName.length < 10){

                            for (let i = 0; i < arrOfName.length; i++) {
                                for (let j = i + 1; j < arrOfName.length; j++) {
                                    if (arrOfName[i] == arrOfName[j]) {
                                      arrOfName.splice(j, 1);
                                    }
                                    else  j++;
                                }
                            }
                        }
                    }
               });
            });
        }

        return (
            <div className="searchStationComponent">
                <form onSubmit={this.startSearch.bind(this)}>
                  Find first 20 bus stop:  <input onChange={this.setBus.bind(this)}
                           type="text"
                           value={this.state.searchStation}
                           className="inputStation"
                           placeholder="enter  number of bus"
                    />
                    <button className="btnSearch">Search</button>
                </form>
                { (this.state.transportObj.length >0) ?  <div className="nameStation"><em>Bus station</em>: {arrOfName.join(', ')}</div> : null}
            </div>
        )
    }
}
export default SearchBus;
