import React from 'react';
import ReactObservableContext from './context';

const connect = (mapContextToProps) => {
  return function (Component) {
    return (
      <ReactObservableContext.Consumer>
        {
          (context) => {
            return (
              <Component {...mapContextToProps(context)} />
            )
          }
        }
      </ReactObservableContext.Consumer>
    )
  }
};

export default connect;
