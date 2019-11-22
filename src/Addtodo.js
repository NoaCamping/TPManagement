import React from 'react';
import './Addtodo.css';
import {firebase} from './firebase/firebase';

class Addtodo extends React.Component{
    constructor(props){
        super(props);

    }
   
    //function saves the new task given by user to DB 
    addNewMission=async(e)=>{
        
        let newTitle=document.getElementsByName("title")[0].value;
        let userid=this.props.c_id;
        //number of new task for client number "userid"
        let newTaskNumber=this.props.numOfTasksPerClient[parseInt(userid)-1];
        firebase.database().ref("TasksExtra").child(newTaskNumber).set(
                {
                    title: newTitle,
                    completed: false,
                    userId: userid,
                    id: newTaskNumber
                 }
            )
        //updating number of added tasks in DB for each client
        await this.props.addOnePerClients(userid-1);   
        //closing the textbox
        await this.props.closeAddTodo(e);   
    }
  
    render(){
        return(
            <div className="todo-box">
                <h4>Title: &nbsp; &nbsp;<input type="text" placeholder="Title" name="title"/></h4>
                <div id="btns-todos">
                    <input type="button" onClick={e=>{this.props.closeAddTodo(e)}} value="Cancel" id="addtodo-btn"/>
                    <input type="button"  onClick={e=>{this.addNewMission(e)}} value="Add" id="addtodo-btn"/>
                </div>
            </div>
        );
    }
}

export default Addtodo;