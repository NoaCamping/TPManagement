import React from 'react';
import Post from './Post';
import {firebase} from './firebase/firebase';
import axios from 'axios';
import './Boards.css';
import {connect} from "react-redux";

class Pboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            "e_number":0,
            "all_posts":[],
            "c_id": this.props.given_id
        }
    }

    /*UNSAFE_componentWillReceiveProps=async()=>{
        //await this.setState({c_id: this.props.currentCardId})
        //await this.setState({c_id: this.props.given_id})
        console.log("props given was: "+this.props.given_id)
    }*/

    async componentDidMount(){
        //number of employees
        await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(resp=>{
            this.setState({e_number: resp.data.length});
        });

        //Posts  - arranging DB according to userId number
        let jarr=[];
        let user_number=1;
        //console.log("number id is: "+this.props.given_id)
            await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(resp=>{
                const postbox=resp.data;
                this.setState({"all_posts": postbox});
                //deleting old information from DB in case DB is not empty
            firebase.database().ref('Posts').remove();    
                //inserting data 
                for(let item of postbox)
                {  
                    if(item.userId===user_number)
                    {
                        jarr.push(item);
                    }
                    else{
                        firebase.database().ref('Posts').child(user_number).set(jarr);
                        jarr=[];
                        user_number++;
                        jarr.push(item); 
                    }       
                    
                }
                firebase.database().ref('Posts').child(user_number).set(jarr);
               }) 
            
       
    }

    render(){
        let theposts=this.state.all_posts;
        let parr=[];
        for(var i=0; i<theposts.length; i++)
        {
            if(theposts[i].userId===this.state.c_id)
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
//const mapStateToProps=state=>state

//export default connect(mapStateToProps)(Pboard);
export default(Pboard);