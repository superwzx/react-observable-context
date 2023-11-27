import React, { Component } from 'react';
import { useObservableSelector, /* connect */ } from '../index';

// const mapContextToProps = (state) => {
//     return {
//         ha: state.ha
//     }
// };

const Family = () => (
  <div className="family">
    {/* {connect(mapContextToProps)(Person)} */}
    <Person />
  </div>
)

const Person = (props) => {
  const { ha } = useObservableSelector((state) => state);
  const handleClick = (ha) => {
    const newVal = ha() + 1;
    ha(newVal);
  };
  return (
    <div className="person">
      <React.Fragment>
        <div>123</div>
        <p>Age: {ha()}</p>
        <button onClick={() => handleClick(ha)}>click me</button>
      </React.Fragment>
    </div>
  )
};


class App extends Component {
  render() {

    return (
      <div>
        <p>I am the abc</p>
        <Family />
      </div>

    );
  }
}


export default App;
