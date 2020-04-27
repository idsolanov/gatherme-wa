import React, { Component } from "react";


import './SignUp.css';
class SignUp extends Component {

    constructor(props) {

        super(props);
        this.state={
          test: "Hola"
          
          }
    }
    
      render(){
          return(
            <div>
                <p>Sign Up</p>
                <p>{this.state.test}</p>
            </div>
            );
      }
}
export default SignUp;  