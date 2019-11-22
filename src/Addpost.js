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
        let newPostNumber=this.props.numOfPostsPerClient[parseInt(userid)-1];
        firebase.database().ref("PostsExtra").child(newPostNumber).set(
                {
                    title: newTitle,
                    body: newBody,
                    userId: userid,
                    id: newPostNumber
                 }
            )
        //updating number of added posts in DB for each client
        await this.props.addOnePerPosts(userid-1);   
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