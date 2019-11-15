import React from 'react';
import './Activeside.css';
import Tboard from './Tboard';
import Pboard from './Pboard';
import axios from 'axios';
import {connect} from "react-redux";

class Activeside extends React.Component{
    constructor(props){
        super(props);

        this.state={"c_id":this.props.c_id,"e_number":0}
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
    
    render(){
        //console.log("inside render active id inside state: "+this.state.c_id)
        
        return(
            <div className="main">
                
                <div>
                    Todos-User {this.state.c_id} <input type="button" value="Add" id="add_todos"/>  
                </div>
                <div className="lbl_tp">
                    <Tboard given_id={this.state.c_id} numOfE={this.state.e_number}/> 
                </div>
               <br/>
               <br/>
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