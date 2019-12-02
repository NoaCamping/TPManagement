import React from 'react';
import './Usercard.css';
import Activeside from './Activeside';
import {firebase} from './firebase/firebase';

class Usercard extends React.Component{

    constructor(props){
        super(props);

     
        this.state={
            "filters_result":this.props.filteredpeople,
            "completed_tasks":this.props.completed_tasks,
            "the_employees": this.props.employees,
            "search_was_done": this.props.search_was_done,
            "hover":[],
            "deleted_pressed":false,
            "background_changed":"white",
            "whoneedscolor":"",
            "currentName":"",
            "currentEmail":"",
            "extra_task_number":0
        }
                     
    }
    componentDidMount=()=>{
        this.setState({"the_employees": this.props.employees});   
    }
    UNSAFE_componentWillReceiveProps(){
        //initializing array for hover operation
        let hoverAll=[false];
        for(var i=1; i<=this.props.employees.length; i++)
        {
            hoverAll.push(false);
        }
        this.setState({"hover":hoverAll, "the_employees": this.props.employees})                             
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
        //console.log("employee id: "+e.target.id+" its name is: "+document.getElementById("name_input").value);
        firebase.database().ref('A/'+userid).update({
            name: this.state.currentName,
            email: this.state.currentEmail
        });
          alert("employee with id number: "+userid+" was updated");
      }

      //function deletes current employee from DB and refreshed screen
      deleteEmployee=(e)=>{
          e.preventDefault();
          var userid=e.target.id;
          //firebase.database().ref('A/'+userid).set(null);
          firebase.database().ref('A/'+userid).remove();
          console.log("employee with id number: "+userid+" was deleted from database");
          //refreshing screen
          this.updateClientsScreen(userid);
           }
        
        //function changes background color when user clicks on text-box   
        background_change=(e)=>{
            var needColor=e.target.value;  //number of client that was clicked
            this.setState(()=>{return{"whoneedscolor": needColor}});
                  
            if(this.state.background_changed==="white")
            {
                this.setState({background_changed: "pink"});
            }       
            else if(this.state.background_changed==="pink")
            {
                this.setState({background_changed: "white"});  
            }       
        }

        //function refreshes screen in case a employee was removed from DB
        updateClientsScreen=(userid)=>{
            let currentEmps=this.state.the_employees;
            for(let i=0; i<currentEmps.length; i++)
            {
                if(parseInt(userid)===parseInt(currentEmps[i].id))
                    currentEmps.splice(i,1);
            }
            //console.log(currentEmps);
            this.setState({"the_employees": currentEmps});
        }
       
        //function saves name of client that was changed - in order to preform future update
        getName=(e)=>{
            //console.log("name of client is: "+e.target.value);
            this.setState({"currentName": e.target.value});
        }
        //function saves client's email address that was changed - in order to preform future update
        getEmail=(e)=>{
            //console.log("client's email address is: "+e.target.value);
            this.setState({"currentEmail": e.target.value});
        }

        addOneToExtraTasksCounter=()=>{
            this.setState({"extra_task_number": parseInt(this.state.extra_task_number)+1});
        }

    render(){ 
             
        return( 
                     <div id="withoutsearch"> 
                        {this.state.the_employees.map((employee,index)=>
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
                        {this.state.background_changed==="pink"?
                                        <div id="class_visible_popup">
                                                <Activeside c_id={this.state.whoneedscolor}
                                                e_t_num={this.state.extra_task_number}
                                                addOneToExtraTasksCounter={this.addOneToExtraTasksCounter}
                                                />
                                        </div>
                                       :
                                       null
                                            
                                        }

                                    <div className="details">
                                        Name: <input type="text" defaultValue={employee.name} id="name_input" onChange={this.getName}/> 
                                        Email: <input type="text" defaultValue={employee.email} id="email_input" onChange={this.getEmail}/>
                                    </div>
               
                                    <div className="btns">
                                        <input type="button" value="Other Data" className="other_data"
                                        ref="other_data" id={employee.id}
                                        onMouseEnter={this.mousehovering}
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

export default Usercard;