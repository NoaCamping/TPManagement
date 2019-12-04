import React from 'react';
import './Addpost.css';
import {firebase} from './firebase/firebase';

class Addpost extends React.Component{
    constructor(props){
        super(props);
    }

    //function saves the new post given by user to DB 
    addNewPost=async(e)=>{
        
        let newTitle=document.getElementsByName("title")[0].value;
        let newBody=document.getElementsByName("newBody")[0].value;
        let userid=this.props.c_id;
        //number of new post for client number "userid"
        let newPostNumber=this.props.extra_post_number
         /* *************************************************************************** */
         //counting number of tasks in main folder tasks for specific user
        //inserting the new task in specific place in main folder
        let p_location=0;
        firebase.database().ref('Posts').child(userid).orderByKey().once("value")
        .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                p_location++;
            })
        //console.log("p_loc is: "+p_location);
        /* **************************************************************** */    
        firebase.database().ref("PostsExtra").child(newPostNumber).set(
                {
                    userId: userid,
                    id: newPostNumber,
                    title: newTitle,
                    body: newBody
                   
                 }
            )
        })
        /* ************************************************************************** */
        //updating number of manually added posts in DB 
        await this.props.addOneToExtraPostsCounter();  
        //closing the post-textbox
        await this.props.closeAddPost(e);   
    }

    render(){
        return(
            <div className="new-post-box">
                Title: &nbsp; <input type="text" placeholder="Some title" name="title"/><br/>
                Body: &nbsp;<input type="text" placeholder="Some body" name="newBody"/>
                <div className="btns-new-post">
                    <input type="button" value="Cancel" id="new-post-btn" onClick={e=>{this.props.closeAddPost(e)}}/>
                    <input type="button" value="Add" id="new-post-btn"  onClick={e=>{this.addNewPost(e)}}/>
                </div>
            </div>
        );
    }
}

export default Addpost;