import React from 'react';
import {firebase} from './firebase/firebase';
import axios from 'axios';

class Adduser extends React.Component{
    constructor(props){
        super(props);

        this.state={"e_number":0}
    }

    Closecard=(e)=>{
        //deleting data from form boxes
        document.getElementById("username").value="";
        document.getElementById("useremail").value="";
        //closing the box of add_user
        this.props.closeBox(e);
        alert("key was pressed");
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
        //number of employees
        await this.countNumberOfEmployees();       
        firebase.database().ref('A').child(this.state.e_number+1).set({"name": u_name, "email": u_email});
        firebase.database().ref('Posts').child(this.state.e_number+1).set({"userId": this.state.e_number+1});
        firebase.database().ref('Tasks').child(this.state.e_number+1).set({"userId": this.state.e_number+1});
        alert("client was added "+u_name+", "+u_email);
        //closing the box of add_user
        this.props.closeBox(e);
        }
    }
    validateEmail=(email)=> {
        let regexStructure = /\S+@\S+\.\S+/;
        return regexStructure.test(email);
        }
    countNumberOfEmployees=async()=>{
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(resp=>{
                this.setState(()=>{return {e_number: resp.data.length}});
            });
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