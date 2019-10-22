import React from 'react';


class Adduser extends React.Component{
    constructor(props){
        super(props);

        this.state={"name":"", "email":""}
    }

   
    render(){
        return(
            <div>
                <h2>Add New User</h2>
                <div id="frame">
                    <h3>Name: &nbsp; </h3>
                    <h3>Email: &nbsp;</h3>
                    <br/>
                    <br/>
                    <div id="btns_adduser">
                        <input type="button" value="Cancel"/>
                        <input type="button" value="Add"/>
                    </div>
                </div>
               
            </div>
        );
    }
}
export default Adduser; 