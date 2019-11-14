import React from 'react';
import {firebase} from './firebase/firebase';
import './Usercard.css';
import './Searchrow.css';
import Usercard from './Usercard';
import Adduser from './Adduser';
import axios from 'axios';

class Searchrow extends React.Component{

    constructor(props){
        super(props);

        this.state={
            "employees": [],
            "completed_tasks":[],
            "numofemployees":0,
            "filtered_data":[],
            "search_was_done": false,
            "add_user_screen_on": false
            
        }
        
    }
    
    componentDidMount(){
        this.uploadEmployees();
    }
    async uploadEmployees(){
        //let currentstate=this;
        let task_arr=[];
        let counter=1;  //so data inside DB will be arranged by numbers
        
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp=>{
            const people=resp.data;
            //deleting old information from DB in case DB is not empty
            firebase.database().ref().remove();
            //inserting data 
            for(let item of people)
            {
                     //in order to keys be numbers, I used "set" instead of "push" command
                    firebase.database().ref('A').child(counter).set(item);
                    counter++;
                    task_arr.push("true");  
            }
           
            this.setState({employees: people});
            this.setState({numofemployees: counter-1});
            
           })
              
           //updated completed tasks situation for each client
           await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(resp=>{
                
                for(var i=0; i<resp.data.length; i++)
                    {
                        for(let j=0; j<task_arr.length; j++)
                        {
                                
                                if(resp.data[i].completed===false && resp.data[i].userId===(j+1))
                                    task_arr[j]=false;
                        } 
                    }
                    this.setState({completed_tasks: task_arr});            
           });
    }

    search_word=()=>{
        this.search_db();
        
    }

    //function searches clients who have a specific sub-string in their full name or email
    //the sub-string is given by the user
    search_db=()=>{
        let currentcomponent=this;
        let txt=document.getElementById("text_id").value;
        console.log(txt);
        //updating search status according to data inseted by user
        if(txt.length>0)
            this.setState({search_was_done: true});
        else
            this.setState({search_was_done: false});  
        /* ******************************* */      
        let itemsId=[];
        firebase.database().ref('A').orderByKey().once("value")
        .then( function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var key=childSnapshot.key;
                var childData=childSnapshot.val();
                //console.log("the key: "+key+"\n"+childData.name+"\n");
                if((childData.name).includes(txt) || (childData.email).includes(txt))
                    {
                        itemsId.push(key); 
                        //console.log(childData.name);
                    }
                currentcomponent.setState({filtered_data: itemsId});  
            });   
        }); 
        
    }

    add_user=()=>{
        this.setState((prevState)=>{return {"add_user_screen_on": !prevState.add_user_screen_on}});
        this.updateManuallyAddedClients();
        
    }

    updateManuallyAddedClients=()=>{
        let ref=firebase.database().ref('ManuallyInsertedClients');
        let wholeclients=this.state.employees;
        let counter1=this.state.numofemployees;
        ref.on("child_added",function(snapshot){
            let ad_client=snapshot.val();
            let thename=firebase.database().ref('A').child(counter1).name;
            let theemail=firebase.database().ref('A').child(counter1).email;
            if(thename!==ad_client.name && theemail!==ad_client.email)
                    firebase.database().ref('A').child(counter1+1).set(ad_client);
            counter1++;
            if(wholeclients[wholeclients.length-1].name!==ad_client.name && wholeclients[wholeclients.length-1].email!==ad_client.email)
                    wholeclients.push(ad_client);  
        })
        ref.remove();
        this.setState(()=>{return {"numofemployees": counter1, "employees":wholeclients}})

    }
 
    render(){
        
        return(
            <div>
                    <div id="row_position">
                        Search <input type="text" onChange={this.search_word} id="text_id"/> &nbsp;
                        <input type="button" value="Add" className="d_btn" onClick={this.add_user} />
                    </div>
                    <div className="add_mission"
                    id={this.state.add_user_screen_on?"see_card":"hide_card"}
                    >
                        <Adduser closeBox={this.add_user}/>
                    </div>
                    <Usercard 
                    filteredpeople={this.state.filtered_data}
                    employees={this.state.employees}
                    completed_tasks={this.state.completed_tasks}
                    numofemployees={this.state.numofemployees}
                    search_was_done={this.state.search_was_done}
                    />
            </div>
            
            
        );
    }
}

export default Searchrow;