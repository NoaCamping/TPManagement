import React from 'react';

class Task extends React.Component{
    constructor(props){
        super(props);

        this.state={"title":this.props.value.title, "completed": this.props.value.completed}
    }

    mark_completed=()=>{
        this.setState({completed: true});
    }

    render(){
        //if we have notasks at all - don't show anything
        if(!this.props.value)
            return;

        return(
            <div>
                <h3>Title: &nbsp; {this.state.title}</h3>
                <h3>
                {(!this.state.completed)?<div>Completed:
                <input type="button" value="Mark Completed" onClick={this.mark_completed} style={{"backgroundColor": "orange","padding":"0.5em"}}/>
                </div>
                :<div>Completed: &nbsp; &nbsp; True</div>
                }
                </h3>
            </div>
        );
    }
}
export default Task; 