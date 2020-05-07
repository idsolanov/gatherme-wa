import React, { Component } from "react";
import NavBar from '../Navigation/NavBar'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { IconContext } from "react-icons";
import { FiEdit2 } from 'react-icons/fi';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GatherCard from '../GatherCard/GatherCard'
import { Link } from 'react-router-dom';

import Route from '../Route'



import './Profile.css';


class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
            token: this.props.location.state.userData.token,
            otherUser:this.props.match.params.username,
            nickName: this.props.location.state.userData.nickName,
			otherUserData: "",
			index: 0,

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
	}

	componentDidMount() {
		axios({
			url: Route.url,
			method: 'post',
			data: {
				query: `
			  query {
				userByUsername(username: "${this.state.otherUser}") {
				  id
				  username
				  description
				  picture
				  name
				  age
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
				otherUserData: result.data.data.userByUsername,

			});
		}, (error) => {
			console.log(error);
		});
	}

	handleChange(event, value) {
		console.log(this.state.index);

		this.setState({
			index: value,
		});
	}

	handleChangeIndex(index) {
		this.setState({
			index,
		});
	}

	render() {
        console.log(this.state.nickName);
        console.log(this.state.token);
        
		return (
			<div className="other_profile">
				<NavBar token={this.state.token} username={this.state.nickName} />
				<div className="other_profile_content">
					<Grid container
						spacing={5}
						direction="row"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap" >
						
						< Grid item xs={5}>
							<div className="other_profile_card_container">
								<div className="other_profile_card">
									<div className="info_container">
										<div className="other_profilephoto">
											<img className="adjust_photo" src={this.state.otherUserData.picture} ></img>
										</div>
										<div className="text_info">
											<div className="basic_info_container">
												<div className="name_container">
													<p className="name_text">{this.state.otherUserData.name}, {this.state.otherUserData.age}</p>
												</div>
												<div className="username_container">
													<p className="username_text">{this.state.otherUserData.username}</p>
													
												</div>
											</div>


											<p className="user_bio_text">{this.state.otherUserData.description}</p>
										</div>
									</div>
								</div>

							</div>

						</ Grid>
						< Grid item xs={7}>
							<div className="other_profile_swipe">
								<div className="tabs_container">
									<Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
										<Tab label="Actividades" />
										<Tab label="Gustos" />
										<Tab label="Gathers" />
									</Tabs>
									<SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
										<div className="tab_garment">

                                        <h1 className="exchanges_heading">Lista de Actividades</h1>
											<div className="exchanges_heading_divider"> <span></span></div>
										</div>
										<div className="tab_garment">
											<h1 className="exchanges_heading">Lista de Gustos</h1>
											<div className="exchanges_heading_divider"> <span></span></div>
										</div>
										
									</SwipeableViews>

								</div>
							</div>
						</ Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default Profile; 
