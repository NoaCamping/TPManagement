import React from 'react';
import './Activeside.css';
import Tboard from './Tboard';
import Pboard from './Pboard';
import axios from 'axios';
import Addtodo from './Addtodo';
import Addpost from './Addpost';

class Activeside extends React.Component{
    constructor(props){
        super(props);

        this.state={"c_id":this.props.c_id,"e_number":0, "newtodo":false,"newPost": false
        }
    }
  
    //helping function - to count number of employees 
    numOfE=async()=>{
        //number of employees
        await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(resp=>{
                this.setState({
                    e_number: resp.data.length
            });
       
    })}
    //function counts number of employees
    componentDidMount=async()=>{
        await this.numOfE(); 
    }

    //function updates whether todo-task button was pressed
    newToDoBtnWasPressed=(e)=>{
        
        if(e.target.id==="add_todos")
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }
    //function updates whether todo-task button was pressed  - so it becomes false - when finishing
    //inserting the new task
    closeToDoScreen=(e)=>{
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }
    //function updates whether add-post button was pressed
    newAddedPost=(e)=>{
        if(e.target.id==="add_posts")
            this.setState(prevState=>
                {return {"newPost": !prevState.newPost}
                });
    }
    //function updates whether add-post button was pressed  - so it becomes false - when finishing
    //inserting the new post
    newAddedPost2=(e)=>{
        this.setState(prevState=>
                {return {"newPost": !prevState.newPost}
                });
    }
   

    render(){
        //console.log("inside render active id inside state: "+this.state.c_id)
        
        return(
            <div className="main">
                <div>
                    Todos-User {this.state.c_id} <input type="button" value="Add" id="add_todos" onClick={this.newToDoBtnWasPressed}/>
                    {this.state.newtodo===true?<Addtodo closeAddTodo={this.closeToDoScreen} c_id={this.state.c_id}
                    e_number={this.state.e_number}
                     extra_task_number={this.props.e_t_num}
                     addOneToExtraTasksCounter={this.props.addOneToExtraTasksCounter}
                     
                     />:null}  
                
                {this.state.newtodo===false?
                    <div>
                        <div className="lbl_tp">
                            <Tboard given_id={this.state.c_id} numOfE={this.state.e_number}
                             /> 
                        </div>
                        <br/>
                        <br/>
                    </div>
                    :null
                }
                </div>
                <div>
                    Posts-User {this.state.c_id} <input type="button" value="Add" id="add_posts" onClick={this.newAddedPost}/>
                    {this.state.newPost===true?<Addpost closeAddPost={this.newAddedPost2} c_id={this.state.c_id}
                    e_number={this.state.e_number}
                   />: null}
                
                    {this.state.newPost===false?
                        <div className="lbl_tp">
                            <Pboard given_id={this.state.c_id} numOfE={this.state.e_number} />   
                        </div>
                    :null
                    }
                </div>
            </div>
        );
    }
}


export default Activeside;