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
            "hover":[],
            "deleted_pressed":false,
            "background_changed":"white",
            "whoneedscolor":"",
            "task_counter":0
        }
        
                    
    }

    UNSAFE_componentWillReceiveProps(){
        let hoverAll=[false];
        for(var i=1; i<=this.props.employees.length; i++)
        {
            hoverAll.push(false);
        }
        
        this.setState({
            "filters_result":this.props.filteredpeople,
            "employees":this.props.employees, 
            "completed_tasks":this.props.completed_tasks,
            "numofemployees":this.props.numofemployees,
            "search_was_done": this.props.search_was_done,
            "hover":hoverAll
                })                      
      }

      mousehovering=(e)=>{
            e.preventDefault();
            var userid=e.target.id;
            var hover_temp=this.state.hover;
            hover_temp[userid]=true;
            this.setState({hover: hover_temp});

      }
      mousefinishedhovering=(e)=>{
        e.preventDefault();
        var userid=e.target.id;
        var hover_temp=this.state.hover;
        hover_temp[userid]=false;
        this.setState({hover: hover_temp});
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
            var needColor=e.target.value;  //number of client that was clicked
            this.setState(()=>{return{"whoneedscolor": needColor}});
                  
            if(this.state.background_changed==="white")
            {
                this.setState({background_changed: "pink"});
                this.updateId(needColor);
                
            }       
            else if(this.state.background_changed==="pink")
            {
                this.setState({background_changed: "white"});
                
            }       
        }

        updateId=(c_id)=>{
            
            this.props.dispatch({type: "UPDATEID",
            currentCardId: c_id});
            //alert("id was updated with: "+c_id);
        };

        /*addTC=()=>{
            let temp=this.state.task_counter;
            temp=parseInt(temp+1);
            //console.log("number of folder: "+temp);
            this.setState(()=>{return{"task_counter": temp}})
        }*/
        updateTaskCounter=(savedVal)=>{
                this.setState({"task_counter": savedVal});
        }
        
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

                                    </div>
                                    { this.state.background_changed==="pink"?
                                        <div id="class_visible_popup">
                                                <Activeside c_id={this.state.whoneedscolor} e_number={this.state.numofemployees}
                                                updateTaskCounter={this.updateTaskCounter} tc={this.state.task_counter}/>
                                        </div>
                                       :
                                       null
                                            
                                        }

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
                                        className={this.state.hover[employee.id]===true?"show_class":"hide_class"}
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