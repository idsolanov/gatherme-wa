import React, { Component } from "react";


import './Register.css';
class Register extends Component {

    constructor(props) {

        super(props);
        this.state={
          user: this.props.location.state.user,  
          test: "Hola"
          
          }
    }
    
      render(){
          console.log(this.state.user);
          return(
            <div>
                <p>Register</p>
                <p>{this.state.user.username}</p>
            </div>
            );
      }
}
export default Register; 