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
  
    /*UNSAFE_componentWillReceiveProps=()=>{
        this.setState({c_id: this.props.currentCardId})
        alert("info from store: "+this.props.currentCardId);
    }*/


    async componentDidMount(){

        //number of employees
        /*await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp=>{
            this.setState({e_number: resp.data.length});
        });*/
        let numOfSons=0;
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
            let jarr2=[];
            for(let item of taskbox)
            {       
                    if(item.userId===p__counter)
                    {
                        jarr2.push(item);
                        //counting how many tasks per client
                        numOfTasksPerClient[p__counter-1]++;
                    }   
                    else{
                        firebase.database().ref('Tasks').child(p__counter).set(jarr2);
                        p__counter++;
                        numOfTasksPerClient[p__counter-1]++;
                        jarr2=[];
                        jarr2.push(item);
                    }
            }
            firebase.database().ref('Tasks').child(p__counter).set(jarr2);
             //inserting tasks inserted manually
             //p__counter++;
             
             let db_source=firebase.database().ref("TasksExtra");
             if(db_source)
             {        
               db_source.on("value",function(snapshot){
                   //console.log(snapshot.child("1").val());
                   if(snapshot.child(numOfSons)!==null && snapshot.child(numOfSons).val()!==null)
                   {
                    //console.log(snapshot.child(numOfSons).val());
                    let currentid=snapshot.child(numOfSons).val().userId;
                    firebase.database().ref('Tasks').child(currentid).child(parseInt(numOfTasksPerClient[numOfSons])).set(snapshot.child(numOfSons).val()); 
                    numOfTasksPerClient[numOfSons]++;
                    numOfSons++
                   }
               })
                       
                 }
                
           })  
    }


    render(){
        let thetasks=this.state.all_tasks;
        let tarr=[];
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
/*
const mapStateToProps=state=>state
export default connect(mapStateToProps)(Tboard);*/
export default (Tboard);