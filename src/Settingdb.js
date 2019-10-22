import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {startAddEmployee} from './Employees';

export class Setting_db extends React.Component{
    constructor(props){
        super(props);

        this.state={"employees_list":[],"completed_tasks":[]}
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp=>{
        const people=resp.data;
        this.setState({employees_list: people});
    })

    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(resp=>{
        const completed=resp.data;
        this.setState({completed_tasks: completed});
    })
    }

    render(){
        let arr=this.state.employees_list;
        arr.forEach(function(item,index){
            let mye={name:item.name,email:item.email};
            startAddEmployee(mye);
       })
        return(
            <div>
               
            </div>
           
            
        );
    }
}
const mapDispatchToProps=(dispatch)=>({
    startAddEmployee: (employee)=>dispatch(startAddEmployee(employee))
});
export default connect(undefined, mapDispatchToProps)(Setting_db);