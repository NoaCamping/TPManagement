import React from 'react';
import './Activeside.css';
import Tboard from './Tboard';
import Pboard from './Pboard';
import axios from 'axios';
import Addtodo from './Addtodo';

class Activeside extends React.Component{
    constructor(props){
        super(props);

        this.state={"c_id":this.props.c_id,"e_number":0, "newtodo":false,"task_counter":this.props.tc,
         "numOfTasksPerClient":new Array(this.props.e_number).fill(0)}
    }
  
    componentWillUnmount=()=>{
        //saving value of task_counter for more clients to come
        this.props.updateTaskCounter(this.state.task_counter);
        console.log(this.state.task_counter);
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
    newToDo=(e)=>{
        
        if(e.target.id==="add_todos")
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }
    newToDo2=(e)=>{
        
            this.setState(prevState=>
                {return {"newtodo": !prevState.newtodo}
                });
    }
    addOneTaskCounter=(e)=>{
        let temp=this.state.task_counter;
        this.setState({"task_counter": parseInt(temp+1)});
    }
    addOneTasksPerClients=(index)=>{
        let items=this.state.numOfTasksPerClient;
        items[parseInt(index)]++;
        this.setState(()=>{return{"numOfTasksPerClient": items}})
    }
    render(){
        //console.log("inside render active id inside state: "+this.state.c_id)
        
        return(
            <div className="main">
                
                <div>
                    Todos-User {this.state.c_id} <input type="button" value="Add" id="add_todos" onClick={this.newToDo}/>
                    {this.state.newtodo===true?<Addtodo closeAddTodo={this.newToDo2} c_id={this.state.c_id}
                    e_number={this.state.e_number} task_counter={this.state.task_counter} addOne={this.addOneTaskCounter}
                     numOfTasksPerClient={this.state.numOfTasksPerClient} addOnePerClients={this.addOneTasksPerClients}/>:null}  
                
                {this.state.newtodo===false?
                    <div>
                        <div className="lbl_tp">
                            <Tboard given_id={this.state.c_id} numOfE={this.state.e_number}/> 
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