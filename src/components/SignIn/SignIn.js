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
          console.log(this.state.user);
          return(
            <div>
                <p>Aca va el Sign In</p>
            </div>
            );
      }
}
export default SignIn; 