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
        let newTaskNumber=this.props.extra_task_number
        firebase.database().ref("TasksExtra").child(newTaskNumber).set(
                {
                    title: newTitle,
                    completed: false,
                    userId: userid,
                    id: newTaskNumber
                 }
            )
         
        /* *************************************************************************** */
        //counting number of tasks in main folder tasks for specific user
        //inserting the new task in specific place in main folder
        /*let t_location=0;
        firebase.database().ref('Tasks').child(userid).child(t_location).orderByKey().once("value")
        .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                t_location++;})
            console.log("t_loc is: "+t_location);
        })
    
        firebase.database().ref('Tasks').child(userid).set({
            title: newTitle,
            completed: false,
            userId: userid,
            id: t_location
        })*/
        /* ************************************************************************** */
        //updating number of added tasks in DB for each client
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