import React from 'react';
import SearchStation from './searchStation';
import SearchBus from './searchBus';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showElems: false
        }

    }
    showElitElems(){
        this.setState({showElems: !this.state.showElems});
    }

    render() {

        return (
            <div>
                <div className="logo">LONDON BUSES</div>
                <div className="search">
                    <div onClick={this.showElitElems.bind(this)} className="searchStation">search by <em>stops</em> </div>
                    <div onClick={this.showElitElems.bind(this)} className="searchNumBus"> search by <em>bus</em> </div>
                </div>

                <div style={{display: this.state.showElems ? "none" : "block"}}> <SearchStation/> </div>
                <div style={{display: this.state.showElems ? "block" : "none"}} > <SearchBus/> </div>

            </div>
        )
    }
}
export default MainPage;
