import React from 'react'
import { Link } from "react-router-dom"

import user from '../imgs/user.png';
import exit from '../imgs/exit.png';
import twitter from '../imgs/social/twitter.png';
import instagram from '../imgs/social/instagram.png';
import facebook from '../imgs/social/facebook.png';

import TaskComponent from './TaskComponent';

async function GetUser(id){
  let url = "http://localhost:5000/api/user/" + id;
  let response = await fetch(url)
  let jsn = await response.json();
  return jsn.data;
}
async function GetTasks(page,id){
  let url = "http://localhost:5000/api/taskNotes/" +page + "/" + id;
  let token = window.localStorage.getItem("mytrellocredentials");
  try{
    if(token){
        let response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      let jsn = await response.json();
      return jsn.data;
    }
  }
  catch(err){
    window.location.href="logIn"
  }
}

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.handleTasks = this.handleTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    let usId = this.props.UserId;
    this.state = {
      newTask: {
        Priority: "important",
        Header: "",
        Description: "",
        UserId: usId  ,
        Complete: false,
        CreationTime: "2012-01-26T13:51:50.417-07:00"
      },
      priority: {
        important: "rgb(253, 0, 0)",
        not_important: "rgb(0, 253, 0)",
        archive: "rgb(171, 182, 171)"
      },
      tasks : []
    }
    
  }
  
  async componentWillMount(){
    if(!this.props.user){
      const user = await GetUser(window.localStorage.getItem('currentUserId'));
      if(user) {
        const fetchTasks = await GetTasks(window.localStorage.getItem('1','currentUserId'));
         this.props.updateUserInState(user);
      this.props.updateTasksInState(fetchTasks);
      }
      this.setState({
        newTask: { ...this.state.newTask,
                    UserId: window.localStorage.getItem('currentUserId')
                  }
      });
    }
  }

  handleTasks = event => {
    this.setState({
      newTask: { ...this.state.newTask,
                  [event.target.name]: event.target.value
                }
    }); 
  }


  handleChange = event => {
    this.setState({
      newTask: { ...this.state.newTask,
                  [event.target.name]: event.target.value
                }
    });
  }


  handleSubmit = async event => {
    event.preventDefault();

    let url = "http://localhost:5000/api/taskNotes";
    let token = window.localStorage.getItem("mytrellocredentials");
    if(token){
      let response = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(this.state.newTask),
        headers: { 
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      let json = response.json();
      let newTask = json.data;
      if(newTask){
        this.setState({
          tasks: { ...this.state.tasks,
                      newTask
                    }
        }); 
      }
    }
  }
    
  render () {
    return (
      <div className="mainPage-container p-0 m-0">
        {this.props.user ? (
          <div>
            <div className="container-fluid m-0 p-0 body-container">

              <div className="row mainRow no-gutters row-cols-1">
              <div className="userCol col-lg-1 col-sm-12 col-xs-12 pt-2">

                
               

                <div className="row p-0 m-0 logoutRow">
                  <Link className="link" to="/logIn" onClick={this.props.logOut}><img src={exit} className="exitIcon"></img></Link>
                </div>
                
              </div>
              <div className="col col-sm-12 col-md-12 col-lg-11 p-0">
              <div className="row p-0 m-0 newTaskRow p-3">
                <form onSubmit={this.handleSubmit} className="newTaskForm">
                <div className="form-group">
                  <label htmlFor="priority"> New Task </label>
                  <select value={this.state.newTask.Priority} 
                          className="form-control priorityList" 
                          id="priority" 
                          name="priority" 
                          onChange={this.handleChange}>
                    <option style={{backgroundColor: this.state.priority.important}} 
                            value="important">important</option>
                    <option style={{backgroundColor: this.state.priority.not_important}} 
                            value="not_important">not important</option>
                  </select>
                </div>
                <div className="form-group row">
                  <label htmlFor="Header" className="col-sm-2 col-form-label">Header</label>
                  <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                    <input type="text"
                          className="form-control" 
                          id="Header" 
                          name="Header"  
                          value={this.state.newTask.Header}
                          onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="Description" className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-8 col-md-8 col-lg-12 ml-1">
                    <input type="text"
                          className="form-control" 
                          id="Description" 
                          name="Description" 
                          value={this.state.newTask.Description}
                          onChange={this.handleChange}/>
                  </div>
                </div>
              <input type="submit" className="btn btn-info" value="Save"/>
              </form>
              </div>
              {this.props.tasks ? (
                <div className="row p-0 m-0 allTasksRow">
                  <input type="button" class="btn btn-light" value="&laquo;"></input>
                  {this.props.tasks.map( task => <TaskComponent id={task.Id} 
                                                              date={task.CreateDate}
                                                              priority={task.Priority}
                                                              name={task.Header}
                                                              description={task.Description}
                                                              onChange={this.handleTasks}></TaskComponent>)}
                  <input type="button" class="btn btn-light" value="&raquo;"></input>
                </div>
              ) : null}
              </div>
            </div>
              <div className="row footerRow no-gutters">
                <div className="col col-xs-6">  
                </div>
                <div className="col link col-xs-6">
              
                </div>
              </div>
                
            </div>
          </div>
          ) : 
          <div className="row notAuthrow">
            <div className="mainPageNotAuth-container">
              <div className="form-group">
                <Link className="link" to="/signUp"><span>Sign up</span></Link>
              </div>
              <div className="form-group link">or</div>
              <div className="form-group">
                <Link className="link" to="/"><span>Log In</span></Link>
              </div>
            </div>
          </div>}  
      </div>
    )
  }
}





export default MainPage;