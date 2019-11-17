import React from 'react';
import './App.css';
import Searchrow from './Searchrow';
import './firebase/firebase';


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <div className="left_side"> 
            <Searchrow/>
        </div>
        <div className="right_side">
            
        </div>
      </div>
    );
  }
 
}

export default App;