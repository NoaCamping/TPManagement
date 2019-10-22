import React from 'react';
import './Usercard.css';
import Activeside from './Activeside';
import {firebase} from './firebase/firebase';
import {connect} from "react-redux";

class Usercard extends React.Component{

    constructor(props){
        super(props);

        this.state={
            "filters_result":[],
            "employees":[], 
            "completed_tasks":[],
            "numofemployees":0,
            "search_was_done": false,
            "hover":false,
            "deleted_pressed":false,
            "background_changed":"white"
        }
        
                    
    }

    UNSAFE_componentWillReceiveProps(){
        
        this.setState({
            "filters_result":this.props.filteredpeople,
            "employees":this.props.employees, 
            "completed_tasks":this.props.completed_tasks,
            "numofemployees":this.props.numofemployees,
            "search_was_done": this.props.search_was_done,
            "hover":false
                })
                               
      }

      mousehovering=(e)=>{
            e.preventDefault();
            var userid=e.target.id;
            this.setState({hover: true});
       
      }
      mousefinishedhovering=(e)=>{
        e.preventDefault();
        var userid=e.target.id;
        this.setState({hover: false});
      }

      updateEmployee=(e)=>{
        e.preventDefault();
        var userid=e.target.id;
        firebase.database().ref('A/'+userid).update({
            name: document.getElementById("name_input").value,
            email: document.getElementById("email_input").value
        });
          alert("employee with id number: "+userid+" was updated");
      }

      deleteEmployee(e){
          e.preventDefault();
          var userid=e.target.id;
          firebase.database().ref('A/'+userid).set(null);
          console.log("employee with id number: "+userid+" was deleted from database");
          alert('record was deleted');
           }
        
        background_change=(e)=>{
            var needColor=e.target.value;
            this.setState({"whoneedscolor": needColor});
            //alert(needColor);        
            if(this.state.background_changed==="white")
            {
                this.setState({background_changed: "pink"});
                this.updateId(needColor);
                
            }       
            else if(this.state.background_changed==="pink")
            {
                this.setState({background_changed: "white"});
                
            }       
            //alert("last color was: "+this.state.background_changed);
        }

        updateId=(c_id)=>{
            
            this.props.dispatch({type: "UPDATEID",
            currentCardId: c_id});
            //alert("id was updated with: "+c_id);
        };


    render(){
        
        
        return( 
                     <div id="withoutsearch">
                        {/*"filters results are: "+this.state.filters_result*/}    
                        {this.state.employees.map((employee,index)=>
                        <div className="card_body" key={index} >
                            <div className={this.state.completed_tasks[employee.id]?"class_green":"class_red"}
                            id={!this.state.search_was_done?"class_visible":this.state.filters_result.includes(JSON.stringify(employee.id))
                            ?"class_visible":"class_hide"}
                            style={this.state.whoneedscolor===JSON.stringify(index+1)?{backgroundColor: this.state.background_changed}:{}}
                            >
                                    <div>
                                    ID: &nbsp; <input type="text" value={employee.id} id="id_input" readOnly
                                      onClick={this.background_change} className="no_border" />
                                        <div id={this.state.background_changed==="pink"?"class_visible_modal":"class_hide_modal"}>
                                            <Activeside c_id={employee.id}/>
                                        </div>

                                     
                                    </div>

                                    <div className="details">
                                        Name: <input type="text" defaultValue={employee.name} id="name_input"/> 
                                        Email: <input type="text" defaultValue={employee.email} id="email_input"/>
                                    </div>
               
                                    <div className="btns">
                                        <input type="button" value="Other Data" className="other_data"
                                        ref="other_data" id={employee.id}
                                        onMouseEnter={this.mousehovering}
                                        //onMouseLeave={this.mousehovering}
                                        onClick={this.mousefinishedhovering}
                                        />
                                        &nbsp; &nbsp; &nbsp;
                                        <div id="hoverData"
                                        className={this.state.hover?"show_class":"hide_class"}
                                        >
                                            Street: <input type="text" defaultValue={employee.address.street}/> 
                                            City: <input type="text" defaultValue={employee.address.city}/> 
                                            Zip Code: <input type="text" defaultValue={employee.address.zipcode}/> 
                                        </div>
                                        <div className="closebtns">
                                            <input type="button" value="Update" className="d_btn" id={employee.id} onClick={this.updateEmployee}/>
                                            <input type="button" value="Delete" className="d_btn" id={employee.id} onClick={this.deleteEmployee}/>
                                        </div>
                                       
                                    </div>
                            </div>
                   
                        </div>
              
                        )}
                        
                    </div>
                   
           
           
            
        );
    }
}
const mapStateToProps=state=>state
export default connect(mapStateToProps)(Usercard);