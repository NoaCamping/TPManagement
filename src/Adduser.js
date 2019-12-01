import React from 'react';
import {firebase} from './firebase/firebase';
import axios from 'axios';

class Adduser extends React.Component{
    constructor(props){
        super(props);

        this.state={"e_number":0}
    }

    componentDidMount=()=>{
        this.countNumberOfEmployees();
    }
    Closecard=(e)=>{
        //deleting data from form boxes
        document.getElementById("username").value="";
        document.getElementById("useremail").value="";
        //closing the box of add_user
        this.props.closeBox(e);
    }
    Updateclient=async(e)=>{
        let u_name=document.getElementById("username").value;
        let u_email=document.getElementById("useremail").value;
        if(this.validateEmail(u_email)===false)
        {
            alert("incorrect email address!"); 
            document.getElementById("useremail").value="";
            document.getElementById("username").value="";
            this.props.closeBox(e);
        }
        else
        {
        //updating user in firebase DB 
        //counting number of employees and updating it in state
        await this.countNumberOfEmployees();
        let numOfId=this.state.e_number+1;      
        firebase.database().ref('ManuallyInsertedClients').child(numOfId).set({"id":numOfId,"name": u_name, "email": u_email,
        "address":{
            "street":"", "city":"","zipcode":""}
        });
        //console.log(u_name+" is client with id: "+numOfId);
        this.setState({e_number: parseInt(numOfId)+1});
       //deleting text boxes for future clients  
        document.getElementById("useremail").value="";
        document.getElementById("username").value="";
        //closing the box of add_user
        this.props.closeBox(e);
        }
    }
   
    validateEmail=(email)=> {
        let regexStructure = /\S+@\S+\.\S+/;
        return regexStructure.test(email);
        }

    countNumberOfEmployees=()=>{
           let empCounter=0;
           firebase.database().ref('A').on("value",function(snapshot){
            //snapshot.val() will be an object containing all users
            var returnArr=[];

            snapshot.forEach(function(childSnapshot){
                var item=childSnapshot.val();
                item.key=childSnapshot.key;
                returnArr.push(item);
            });
                empCounter=returnArr.length;
                   
           });
           //console.log("number of employees is: "+empCounter);  
           this.setState(()=>{return{e_number: empCounter}});  
    }
        
    
    render(){
        return(
            <div>
                <h2>Add New User</h2>
                <div id="frame">
                    <form>
                        <h3>Name: &nbsp;<input type="text" placeholder="insert name" id="username"/> </h3>
                        <h3>Email: &nbsp; <input type="text" placeholder="insert email" id="useremail"/></h3>
                        <br/>
                        <br/>
                        <div id="btns_adduser">
                            <input type="button" value="Cancel" onClick={this.Closecard}/>
                            <input type="button" value="Add" onClick={this.Updateclient}/>
                        </div>
                    </form>
                    
                </div>
               
            </div>
        );
    }
}
export default Adduser; 