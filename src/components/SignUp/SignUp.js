import React, { Component } from "react";

import SingUpCard from './SignUpCard';
import RegisterAssistant from '../RegisterAssistant/RegisterAssistant'
import './SignUp.css';
class SignUp extends Component {

  constructor(props) {

    super(props);
    this.state = {
      test: "Hola"

    }
  }

  render() {
    return (
      <div className="sign_up" >
        <div className="card">
          <SingUpCard />
        </div>
      </div>

    );
  }
}
export default SignUp;  