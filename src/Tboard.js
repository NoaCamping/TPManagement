import React from 'react';
import Task from './Task';
import {firebase} from './firebase/firebase';
import axios from 'axios';
import './Boards.css';

class Tboard extends React.Component{

    constructor(props){
        super(props);

        this.state={
            "e_number":this.props.numOfE,
            "all_tasks":[],
            "c_id": this.props.given_id
            
        }
    }

    async componentDidMount(){
        //Posts  - arranging DB according to userId number
        let p__counter=1;
        await axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(resp=>{
            const taskbox=resp.data;
            this.setState({"all_tasks": taskbox});

            //deleting old information from DB in case DB is not empty
            firebase.database().ref('Tasks').remove();
            //inserting data 
            let numOfTasksPerClient=new Array(10).fill(0);
            let jarr2=[]; //temporary array to save tasks which belong to specific user
            for(let item of taskbox)
            {       
                    if(item.userId===p__counter)
                    {
                        jarr2.push(item);
                        //counting how many tasks on site for specific client
                        numOfTasksPerClient[p__counter-1]++;
                    }   
                    else
                    {   //inserting tasks for specific user into DB
                        firebase.database().ref('Tasks').child(p__counter).set(jarr2);
                        //moving to next client
                        p__counter++;
                        numOfTasksPerClient[p__counter-1]++;
                        jarr2=[];
                        jarr2.push(item);
                    }
            }
            firebase.database().ref('Tasks').child(p__counter).set(jarr2);
             //inserting tasks to Tasks folder which were inserted earlier manually to TasksExtra folder
            let db_source=firebase.database().ref("TasksExtra");
             if(db_source)
             { 
               let numOfSons=0; //running variable on items in folder: TasksExtra   
               db_source.on("value",function (snapshot){
                   //console.log(snapshot.child("1").val());
                   while(snapshot.child(numOfSons)!==null && snapshot.child(numOfSons).val()!==null)
                   {
                    let currentid=snapshot.child(numOfSons).val().userId;
                    firebase.database().ref('Tasks').child(currentid).child(parseInt(numOfTasksPerClient[currentid-1])).set(snapshot.child(numOfSons).val()); 
                    numOfTasksPerClient[currentid-1]++;
                    //console.log("task array is: "+numOfTasksPerClient);
                    numOfSons++;
                   }
                   
               })           
            }//of if
             
                
           })      
    }

    render(){
        let thetasks=this.state.all_tasks;
        let tarr=[]; //array will contain specific client tasks according to given id
        for(var i=0; i<thetasks.length; i++)
        {
            if(thetasks[i].userId===parseInt(this.state.c_id))
                tarr.push(thetasks[i])
        }
        return(
            <div className="main">
                 
                {tarr.map((task1, index)=>
                    
                        <div className="innerbox" key={index}>
                            <Task  value={task1} />
                        </div>
                )}    
               
               
            </div>
        );
    }
}

export default (Tboard);