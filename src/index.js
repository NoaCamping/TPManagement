import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';

const initialState={
    currentCardId: 0
};

function reducer(state=initialState,action){
    switch(action.type){
        case "UPDATEID":
        //alert("id number was received: "+state.currentCardId);  
        return Object.assign(
                    {},
                    state,
                    {currentCardId: action.currentCardId}
        );
          
        default:
            return state;
    }
}
const store=createStore(reducer,
    window.devToolsExtension && window.devToolsExtension());

    /*store.subscribe(()=>{
        //when state will be updated we will update local component state
        this.setState({
            currentCardId: store.getState().currentCardId
        });
    });*/

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
