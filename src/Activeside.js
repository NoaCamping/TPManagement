import React from 'react';
import './Activeside.css';
import Tboard from './Tboard';
import Pboard from './Pboard';
import axios from 'axios';
import Addtodo from './Addtodo';

class Activeside extends React.Component{
    constructor(props){
        super(props);

        this.state={"c_id":this.props.c_id,"e_number":0, "newtodo":false,
         "numOfTasksPerClient":new Array(this.props.e_number).fill(0)}
    }
  
    componentWillUnmount=()=>{
        //updating that current task was added successfully
        this.props.updateFinishTasks();
        
    }
  
    numOfE=async()=>{
        //number of employees
        await axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(resp=>{
                this.setState({e_number: resp.data.length});
            });
       
    }
    componentDidMount=async()=>{
        await this.numOfE(); 
    }

    //function updates whether todo-task button was pressed
    newToDo=(e)=>{
        
        if(e.target.id==="add_todos")
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }
    //function updates whether todo-task button was pressed  - so it becomes false - when finishing
    //inseting the new task
    newToDo2=(e)=>{
        
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }

    //updating array of clients, how many tasks, each client has on DB.
    addOneTasksPerClients=(index)=>{
        let currentNumOfTasksPerClient=this.state.numOfTasksPerClient;
        currentNumOfTasksPerClient[parseInt(index)]++;
        this.setState(()=>{return{"numOfTasksPerClient": currentNumOfTasksPerClient}})
    }
    render(){
        //console.log("inside render active id inside state: "+this.state.c_id)
        
        return(
            <div className="main">
                
                <div>
                    Todos-User {this.state.c_id} <input type="button" value="Add" id="add_todos" onClick={this.newToDo}/>
                    {this.state.newtodo===true?<Addtodo closeAddTodo={this.newToDo2} c_id={this.state.c_id}
                    e_number={this.state.e_number}
                     numOfTasksPerClient={this.state.numOfTasksPerClient} addOnePerClients={this.addOneTasksPerClients}/>:null}  
                
                {this.state.newtodo===false?
                    <div>
                        <div className="lbl_tp">
                            <Tboard given_id={this.state.c_id} numOfE={this.state.e_number} updateFinishTasks={this.props.updateFinishTasks}
                            fini={this.props.fini}/> 
                        </div>
                        <br/>
                        <br/>
                    </div>
                    :null
                }
                </div>
                <div>
                    Posts-User {this.state.c_id} <input type="button" value="Add" id="add_posts"/>
                </div>
                <div className="lbl_tp">
                    <Pboard given_id={this.state.c_id} numOfE={this.state.e_number} /> 
                </div>
                
            </div>
        );
    }
}

/*const mapStateToProps=state=>state
export default connect(mapStateToProps)(Activeside);*/
export default Activeside;