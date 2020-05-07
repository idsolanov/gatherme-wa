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




import './MyProfile.css';


class MyProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {

			username: this.props.location.state.userData.username,
			token: this.props.location.state.userData.token,
			userData: "",
			profilePhoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
			index: 0,
			gatherList:"",
			gathersToRender: [],
			responseGather: false,
			

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
		this.renderGathers = this.renderGathers.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
	}

	callbackFunction(childData) {
		this.setState({
			responseGather: childData[0],
		});
	}

	componentDidUpdate() {
		
		
		if (this.state.responseGather) {
			this.setState({ responseGather: false });
			this.componentDidMount()
			
		}
	}

	componentDidMount() {
		
		
		axios({
			url: Route.url,
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


		axios({
			url: Route.url,
			method: 'post',
			data: {
				query: `
				query {
					inboxRequests(user:{user:"${this.state.username}"}){
					  id 
					  user_origin 
					  user_destination
					  status 
					  send_date
					}
				  }
				`
			}
		}).then((result) => {
			
			this.renderGathers(result.data.data.inboxRequests)
		}, (error) => {
			console.log(error);
		});

	}

	renderGathers(lista){
		let count = lista.length;
		let gathersRender = [];
		for (var i = 0; i < count; i ++) {
			if(lista[i].status == "sent"){
				gathersRender.push(

					<GatherCard 
					parentCallback={this.callbackFunction} 
					token={this.state.token} 
					gatherUser={lista[i].user_origin} 
					username={this.state.username}
					/>
	
				);
			}
			
		}

		this.setState({
			gathersToRender: gathersRender
		})
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
		console.log("tetst");
		console.log(this.state.test);
		return (
			<div className="Profile">
				<NavBar token={this.state.token} username={this.state.username} />
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
											<img className="adjust_photo" src={this.state.userData.picture} ></img>
										</div>
										<div className="text_info">
											<div className="basic_info_container">
												<div className="name_container">
													<p className="name_text">{this.state.userData.name}, {this.state.userData.age}</p>
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


											<p className="user_bio_text">{this.state.userData.description}</p>
										</div>
									</div>
								</div>

							</div>

						</ Grid>
						< Grid item xs={7}>
							<div className="Profile_swipe">
								<div className="tabs_container">
									<Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
										<Tab label="Actividades" />
										<Tab label="Gustos" />
										<Tab label="Gathers" />
									</Tabs>
									<SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
										<div className="tab_garment">

											<div className="wardrobe_container">

											</div>
										</div>
										<div className="tab_garment">
											<h1 className="exchanges_heading">Lista de Gustos</h1>
											<div className="exchanges_heading_divider"> <span></span></div>
										</div>
										<div className="tab_garment">
											<h1 className="exchanges_heading">Lista de Gathers</h1>
											<div className="exchanges_heading_divider"> <span></span></div>
											{this.state.gathersToRender}
											
			


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

export default MyProfile; 
