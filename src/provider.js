import React from 'react';
import ReactObservableContext from './context';
import {contexts} from "./combineContext";
import objectArrayToObject from './utils/objectArrayToObject';


class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = objectArrayToObject(contexts);
    }

    componentDidMount() {
        contexts.forEach(({name, observable}) => {
            observable.subscribe(() => {
                this.setState({
                    [name]: observable
                })
            })
        })
    }

    render() {
        return (
            <ReactObservableContext.Provider value={this.state}>
                {this.props.children}
            </ReactObservableContext.Provider>
        )
    }
}

export default ContextProvider;
