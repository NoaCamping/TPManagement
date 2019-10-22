import React from 'react';


class Task extends React.Component{
    constructor(props){
        super(props);

        this.state={"title":this.props.value.title, "completed": this.props.value.completed}
    }

    mark_completed=async()=>{
        await this.setState({completed: true});
        alert(this.state.completed);
        //further... maybe updating db - not sure if needed
    }

    render(){
        //console.log("data inside task is: "+this.state.title);
        if(!this.props.value)
            return;

        return(
            <div>
                <h3>Title: &nbsp; {this.state.title}</h3>
                <h3>Completed: &nbsp; {this.state.completed}
                {(!this.state.completed)?
                <input type="button" value="Mark Completed" onClick={this.mark_completed} style={{"backgroundColor": "orange","padding":"0.5em"}}/>
                :<div></div>
                }
                </h3>
            </div>
        );
    }
}
export default Task; 