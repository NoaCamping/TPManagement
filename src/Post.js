import React from 'react';


class Post extends React.Component{
    constructor(props){
        super(props);

        this.state={"title":this.props.value.title, "body": this.props.value.body}
    }
    render(){
        if(!this.props.value)
            return;

        return(
            <div>
                <h4>Title: &nbsp; {this.state.title}</h4>
                <h4>Body: &nbsp; {this.state.body}</h4>
            </div>
        );
    }
}
export default Post; 