import React from 'react';
import Post from './Post';
import {firebase} from './firebase/firebase';
import axios from 'axios';
import './Boards.css';

class Pboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            "e_number":this.props.numOfE,
            "all_posts":[],
            "c_id": this.props.given_id
        }
    }

    async componentDidMount(){

        //Posts  - arranging DB according to userId number
        let jarr=[]; //temporary array to save posts which belong to specific user
        let user_number=1;
        //console.log("number id is: "+this.props.given_id)
            await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(resp=>{
                const postbox=resp.data;
                this.setState({"all_posts": postbox});
                //deleting old information from DB in case DB is not empty
                firebase.database().ref('Posts').remove();    
                //inserting data 
                let numOfPostsPerClient=new Array(10).fill(0);
            
                for(let item of postbox)
                {  
                    if(item.userId===user_number)
                    {
                        jarr.push(item);
                        //counting how many posts on site for specific client
                        numOfPostsPerClient[user_number-1]++;
                    }
                    else{
                        firebase.database().ref('Posts').child(user_number).set(jarr);
                        user_number++;
                        numOfPostsPerClient[user_number-1]++;
                        jarr=[];
                        jarr.push(item); 
                    }       
                    
                }
                firebase.database().ref('Posts').child(user_number).set(jarr);
                 //inserting tasks to Tasks folder which were inserted earlier manually to TasksExtra folder
                let db_source=firebase.database().ref("PostsExtra");
                if(db_source)
                { 
                    let numOfSons=0; //running variable on items in folder: PostsExtra   
                    db_source.on("value",function (snapshot){
                        //console.log(snapshot.child("1").val());
                        while(snapshot.child(numOfSons)!==null && snapshot.child(numOfSons).val()!==null)
                        {
                            let currentid=snapshot.child(numOfSons).val().userId;
                            firebase.database().ref('Posts').child(currentid).child(parseInt(numOfPostsPerClient[currentid-1])).set(snapshot.child(numOfSons).val()); 
                            numOfPostsPerClient[currentid-1]++;
                            //console.log("post array is: "+numOfPostsPerClient);
                            numOfSons++;
                        }
                    })           
                }//of if
               }) 
             
    }

    render(){
        let theposts=this.state.all_posts;
        let parr=[];
        for(var i=0; i<theposts.length; i++)
        {
            if(theposts[i].userId===parseInt(this.state.c_id))
                parr.push(theposts[i])
        }
        
        return(
            <div className="main">
                
                {parr.map((post1, index)=>
                    (
                        <div className="innerbox" key={index}>
                            <Post  value={post1} />
                        </div>
                ))}
                
               
               
            </div>
        );
    }
}

export default(Pboard);