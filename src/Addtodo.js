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
        //number of new manually added task 
        let newTaskNumber=this.props.extra_task_number
         /* *************************************************************************** */
         //counting number of tasks in main folder tasks for specific user
        //inserting the new task in specific place in main folder
        let t_location=0;
        firebase.database().ref('Tasks').child(userid).orderByKey().once("value")
        .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                t_location++;
            })
            //console.log("t_loc is: "+t_location);
            firebase.database().ref("TasksExtra").child(newTaskNumber).set(
                {
                    userId: userid,
                    id: t_location+1,
                    title: newTitle,
                    completed: false
                 }
            )
            
        })
        
        /* ************************************************************************** */
        //updating number of manually added tasks in DB 
        await this.props.addOneToExtraTasksCounter(); 
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