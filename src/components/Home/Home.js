import React, { Component } from "react";

import NavBar from '../Navigation/NavBar'
import axios from 'axios';
import './Home.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state={
          test: "user1"          
        }
    }
    
	render() {
		console.log(this.state.test);
  	    return(
		    <div className="Home">
		    	<NavBar />
		        <p>Aca va el Sign In</p>
		        <p>{this.state.test}</p>
		    </div>
		);
	}
}

export default SignIn; 
