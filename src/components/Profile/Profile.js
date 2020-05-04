import React, { Component } from "react";
import NavBar from '../Navigation/NavBar'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { IconContext } from "react-icons";
import { FiEdit2 } from 'react-icons/fi';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';





import './Profile.css';


class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {

			username: this.props.location.state.userData.username,
			token: this.props.location.state.userData.token,
			userData: "",
			profilePhoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
			index: 0,

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
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
				userData: result.data.data.userByUsername,

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
		console.log(this.state.userData);
		return (
			<div className="Profile">
				<NavBar token={this.state.token} />
				<div className="Profile_content">
					<Grid container
						spacing={5}
						direction="row"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap" >

						< Grid item xs={5}>
							<div className="Profile_card_container">
								<div className="Profile_card">
									<div className="info_container">
										<div className="profilephoto">
											<img className="adjust_photo" src={this.state.profilePhoto} ></img>
										</div>
										<div className="text_info">
											<div className="basic_info_container">
												<div className="name_container">
													<p className="name_text">Nicolas Saavedra, 17</p>
												</div>
												<div className="username_container">
													<p className="username_text">{this.state.userData.username}</p>
													<div className="user_edit_btn_container">
														<div className="user_edit_btn">
															<IconContext.Provider value={{ size: "1em", className: 'user_edit_icon' }}>
																<FiEdit2 />
															</IconContext.Provider>
															<p className="user_edit_btn_label">Editar perfil</p>
														</div>

													</div>
												</div>
											</div>


											<p className="user_bio_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
										</div>
									</div>
								</div>

							</div>

						</ Grid>
						< Grid item xs={7}>
							<div className="Profile_swipe">
								<div className="tabs_container">
									<Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
										<Tab label="Guardarropa" />
										<Tab label="Mis Catalogos" />
										<Tab label="Mis Intercambios" />
									</Tabs>
									<SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
										<div className="tab_garment">
											
											<div className="wardrobe_container">
												<p>Tab 1</p>
											</div>
										</div>
										<div className="tab_garment">Acá estarán los catálogos del usuario</div>
										<div className="tab_garment">
											<h1 className="exchanges_heading">Intercambios activos</h1>
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
