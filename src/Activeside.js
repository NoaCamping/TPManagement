import React from 'react';
import './Activeside.css';
import Tboard from './Tboard';
import Pboard from './Pboard';
import {connect} from "react-redux";

class Activeside extends React.Component{
    constructor(props){
        super(props);

        this.state={"c_id":this.props.c_id}
    }
  
    
    render(){
        //console.log("inside render active id inside state: "+this.state.c_id)
        return(
            <div className="main">
                {/*<h1>app right side</h1>*/}
                <div className="lbl_tp">
                    Todos-User <input type="button" value="Add" id="add_todos"/>  
                </div>
                <Tboard given_id={this.state.c_id}/> 
                <div className="lbl_tp">
                    Posts-User <input type="button" value="Add" id="add_posts"/>
                </div>
                <Pboard given_id={this.state.c_id} /> 
            </div>
        );
    }
}

const mapStateToProps=state=>state
export default connect(mapStateToProps)(Activeside);
//export default Activeside;