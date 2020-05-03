import React, { Component } from "react";

import NavBar from '../Navigation/NavBar'






import './Profile.css';


class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
			username: this.props.location.state.userData.username,
            token: this.props.location.state.userData.token,
            userData: "",
			
		}
	}

	componentDidMount() {
        axios({
			url: 'http://127.0.0.1:9001/graphql',
			method: 'post',
			data: {
				query: `
			  query {
				userByUsername(username: "${this.state.username}") {
				  id
				  username
				  email	
				  activities
				  communities
				  likes
				  gathers
				}
			  }
				`
			}
		}).then((result) => {
			this.setState({
				userData: result.data.data.userByUsername
			});
		}, (error) => {
			console.log(error);
		});
	}

	render() {
		console.log(this.state.userData);
		return (
			<div className="Profile">
				<NavBar token={this.state.token} />
            </div>
		);
	}
}

export default Profile; 
