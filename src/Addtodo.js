import React from 'react';
import './Addtodo.css';
import {firebase} from './firebase/firebase';

class Addtodo extends React.Component{
    constructor(props){
        super(props);

        //this.state={"title":"","userid":"", "tc":"", "missionid":""}
    }
   
    addNewMission=async(e)=>{
        
        let newTitle=document.getElementsByName("title")[0].value;
        let userid=this.props.c_id;
        let tc=this.props.task_counter;
        let missionid=this.props.numOfTasksPerClient[userid-1];
        //console.log(this.props.numOfTasksPerClient);
        //console.log("the mission id : "+missionid); 
        firebase.database().ref("TasksExtra").child(tc).set(
                {
                    title: newTitle,
                    completed: false,
                    userId: userid,
                    id: missionid
                 }
            )
        //updating number of added tasks for each client
        //temp_added_tasks[userid-1]++;
        
        //console.log("temp_added_tasks: "+this.props.numOfTasksPerClient);
        //console.log("task counter is: "+this.props.task_counter);
        this.props.addOnePerClients(userid-1);
        await this.props.addOne(e);    
        
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