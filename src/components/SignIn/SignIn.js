import React, { Component } from "react";
import SignInCard from "./SignInCard"


import './SignIn.css';
class SignIn extends Component {

  constructor(props) {

    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="sign_in" >
        <div className="card">
          <SignInCard />
        </div>
      </div>
    );
  }
}
export default SignIn; 