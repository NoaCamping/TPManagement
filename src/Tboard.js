import React from 'react';
import Task from './Task';
import {firebase} from './firebase/firebase';
import axios from 'axios';
import './Boards.css';
import {connect} from "react-redux";

class Tboard extends React.Component{

    constructor(props){
        super(props);

        this.state={
            "e_number":0,
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
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp=>{
            this.setState({e_number: resp.data.length});
        });

        //Posts  - arranging DB according to userId number
        let p__counter=1;
        await axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(resp=>{
            const taskbox=resp.data;
            this.setState({"all_tasks": taskbox});

            //deleting old information from DB in case DB is not empty
            firebase.database().ref('Tasks').remove();
            //inserting data 
            let jarr2=[];
            for(let item of taskbox)
            {       
                    if(item.userId===p__counter)
                        jarr2.push(item);
                    else{
                        firebase.database().ref('Tasks').child(p__counter).set(jarr2);
                        p__counter++;
                        jarr2=[];
                        jarr2.push(item);
                    }
            }
            firebase.database().ref('Tasks').child(p__counter).set(jarr2);
           })  
    }

    render(){
        let thetasks=this.state.all_tasks;
        let tarr=[];
        for(var i=0; i<thetasks.length; i++)
        {
            if(thetasks[i].userId===this.state.c_id)
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