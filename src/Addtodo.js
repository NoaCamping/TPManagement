import React from 'react';
import './Addtodo.css';

class Addtodo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="todo-box">
                <h4>Title: &nbsp; &nbsp;<input type="text" placeholder="Title"/></h4>
                <div id="btns-todos">
                    <input type="button" onClick={e=>{this.props.closeAddTodo(e)}} value="Cancel" id="addtodo-btn"/>
                    <input type="button" value="Add" id="addtodo-btn"/>
                </div>
            </div>
        );
    }
}

export default Addtodo;