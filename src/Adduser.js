import React from 'react';


class Adduser extends React.Component{
    constructor(props){
        super(props);

        this.state={"name":"", "email":""}
    }

    Closecard=(e)=>{
        alert("key was pressed");
    }
    Updateclient=(e)=>{
        alert("client was added");
    }
   
    render(){
        return(
            <div>
                <h2>Add New User</h2>
                <div id="frame">
                    <h3>Name: &nbsp;<input type="text" placeholder="insert name"/> </h3>
                    <h3>Email: &nbsp; <input type="text" placeholder="insert email"/></h3>
                    <br/>
                    <br/>
                    <div id="btns_adduser">
                        <input type="button" value="Cancel" onClick={this.Closecard}/>
                        <input type="button" value="Add" onClick={this.Updateclient}/>
                    </div>
                </div>
               
            </div>
        );
    }
}
export default Adduser; 