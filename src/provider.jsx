import React from 'react';
import ReactObservableContext from './context';
import { contexts } from "./combineContext";

class ContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updater: Date.now(),
      ...props.state
    };
  }

  componentDidMount() {
    for (let i in contexts) {
      contexts[i].subscribe(() => {
        this.setState({
          [i]: contexts[i]
        })
      })
    }
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
