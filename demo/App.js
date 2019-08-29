import React, { Component } from 'react';
import {Observable} from '../index';

var ha = Observable(1);

// first we will make a new context
const MyContext = React.createContext({ha: ha});

class MyProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ha: ha
        };
    }

    componentDidMount() {
        ha.subscribe((e) => {
            this.setState({
                ha: ha
            })
        })
    }
    render() {
        return (
            <MyContext.Provider value={{ha: this.state.ha}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

const Family = (props) => (
    <div className="family">
        <Person />
    </div>
)

const Person = () => {
    const handleClick = (ha) => {
        const newVal = ha() + 1;
        ha(newVal);
    }
    return (
        <div className="person">
            <MyContext.Consumer>
                {({ha}) => {
                    return (
                        <React.Fragment>
                            <p>Age: {ha()}</p>
                            <button onClick={() => handleClick(ha)}>click me</button>
                        </React.Fragment>
                    )
                }}
            </MyContext.Consumer>
        </div>
    )
}


class App extends Component {
    render() {
        return (
            <MyProvider>
                <div>
                    <p>I am the app</p>
                    <Family />
                </div>
            </MyProvider>
        );
    }
}


export default App;
