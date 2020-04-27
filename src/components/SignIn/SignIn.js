import React, { Component } from "react";


import './SignIn.css';
class SignIn extends Component {

    constructor(props) {

        super(props);
        this.state={
          test: "Hola"
          
          }
    }
    
      render(){
          return(
            <div>
                <p>Sign In</p>
                <p>{this.state.test}</p>
            </div>
            );
      }
}
export default SignIn;  