import React, { Component } from "react";

import NavBar from '../Navigation/NavBar'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {
	FloatingMenu,
	MainButton,
	ChildButton,
} from 'react-floating-button-menu';
import MdAdd from '@material-ui/icons/Add';
import SchoolIcon from '@material-ui/icons/School';
import MdClose from '@material-ui/icons/Clear';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TheatersIcon from '@material-ui/icons/Theaters';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DeckIcon from '@material-ui/icons/Deck';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CreateActivity from '../CreateActivity/CreateActivity'
import Route from '../Route'




import './Home.css';
import ActivityCard from '../ActivityCard/ActiviyCard'

const StyledTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		borderRadius: '10px',
		fontSize: 13,
	},
}))(Tooltip);

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			test: "user1",
			isOpen: true,
			userData: "",
			username: this.props.location.state.userData.nickName,
			token: this.props.location.state.userData.token,
			activitiesToRender: [],
			activityList: [],
			createActivityDialogOpen: false,
			createActivity: false,
			render: false
		}
		this.renderActivities = this.renderActivities.bind(this);
		this.handleDialogOpen = this.handleDialogOpen.bind(this);
		this.handleDialogClose = this.handleDialogClose.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
		this.renderCategory = this.renderCategory.bind(this);

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
			console.log(result.data.data.userByUsername);
			this.setState({
				userData: result.data.data.userByUsername
			});
		}, (error) => {
			console.log(error);
		});

		 axios({
		 	url: Route.url,
		 	method: 'post',
		 	data: {
		 		query: `
		 		query{
		 			getAllActivities{
						id
		 			}
		 		  }
				  
		 		`
			}
		}).then((result) => {
			console.log(result.data)
			this.setState({
				activitiesToRender: result.data.data.getAllActivities
			})
			this.renderActivities()
			console.log(this.state.activitiesToRender)

		}, (error) => {
			console.log(error);
		});

	}

	renderActivities() {
		let maxSize = this.state.activitiesToRender.length;
		console.log(maxSize)
		let activityObjects = [];
		for (var i = 0; i < maxSize; i += 3) {
			activityObjects.push(

				<Grid
					container
					spacing={4}
					direction="row"
					justify="center">
					<Grid item xs={4}>
						{(i < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i]} user={this.state.username} token={this.state.token} /> : ""}
					</Grid>
					<Grid item xs={4}>
						{(i + 1 < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i + 1]} user={this.state.username} token={this.state.token} /> : ""}
					</Grid>
					<Grid item xs={4}>
						{(i + 2 < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i + 2]} user={this.state.username} token={this.state.token} /> : ""}
					</Grid>
				</Grid>

			);
		}

		this.setState({
			activityList: activityObjects
		})

	}

	handleDialogOpen() {
		this.setState({ createActivityDialogOpen: true });
	}

	handleDialogClose() {
		this.setState({ createActivityDialogOpen: false });
	}

	callbackFunction(childData) {
		this.setState({
			createActivity: childData[0],
		});
	}
	componentDidUpdate() {
		if (this.state.createActivity) {
			this.setState({ createActivity: false });
			this.handleDialogClose();
			this.componentDidMount();
		}
		if (this.state.render) {
			this.setState({ render: false });
			
			console.log(this.state.activitiesToRender)
		}
	}
	renderCategory(category) {
		axios({
			url: Route.url,
			method: 'POST',
			data: {
				query: `
                query{
					getActivitiesByCategory(category:"${category}") {
					  id
					}
				  }
      `
			}
		}).then((result) => {
			console.log(result.data.data.getActivitiesByCategory)
			this.setState({
				activitiesToRender: result.data.data.getActivitiesByCategory
			})
			this.setState({
				render: true
			})
			this.renderActivities()
		});
	}




	render() {
		console.log(Route.url);
		
		
		return (
			<div className="Home">
				<NavBar token={this.state.token} username={this.state.username} />
				<div className="content_home">

					<Grid container
						spacing={5}
						direction="row"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap" >

						< Grid item xs={1}>
							<div className="filters">
								<FloatingMenu
									slideSpeed={600}
									direction="down"
									spacing={8}
									isOpen={this.state.isOpen}
								>
									<MainButton
										iconResting={<StyledTooltip title="Categorias" placement="right"><LocalOfferIcon style={{ fontSize: 20 }} nativeColor="white" /></StyledTooltip>}
										iconActive={<StyledTooltip title="Ocultar" placement="right"><ExpandMoreIcon style={{ fontSize: 25 }} nativeColor="white" /></StyledTooltip>}
										backgroundColor="black"
										onClick={() => this.setState({ isOpen: !this.state.isOpen })}
										size={56}
									/>

									<ChildButton
										icon={<StyledTooltip title="Academico" placement="right"><SchoolIcon style={{ fontSize: 25 }} nativeColor="white" /></StyledTooltip>}
										backgroundColor="white"
										
										size={40}
										onClick={() => this.renderCategory("Academico")}
									/>



									<ChildButton 
										icon={<StyledTooltip title="Deporte" placement="right"><SportsFootballIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Deporte")}

									/>
									<ChildButton
										icon={<StyledTooltip title="Juegos" placement="right"><SportsEsportsIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Juegos")}
									/>
									<ChildButton
										icon={<StyledTooltip title="Cultural" placement="right"><TheatersIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Cultural")}
									/>
									<ChildButton
										icon={<StyledTooltip title="Comidas" placement="right"><FastfoodIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Comidas")}
									/>
									<ChildButton
										icon={<StyledTooltip title="Fiesta" placement="right"><DeckIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Fiesta")}
									/>
									<ChildButton
										icon={<StyledTooltip title="Otros" placement="right"><ListAltIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => this.renderCategory("Otros")}
									/>
								</FloatingMenu>
							</div>

						</Grid>
						< Grid item xs={10}>
							<div className="activity_container">
								{this.state.activityList}
							</div>
						</Grid>
						<div className=" add_container">
							< Grid item xs={1}>
								<StyledTooltip title="Crear Actividad" placement="left" >
									<Fab color="primary" aria-label="add" onClick={this.handleDialogOpen} >
										<MdAdd style={{ fontSize: 25 }} />
									</Fab>
								</StyledTooltip>

							</Grid>
						</div>
					</Grid>
					<Dialog onClose={this.handleDialogClose} aria-labelledby="customized-dialog-title" open={this.state.createActivityDialogOpen} fullWidth={true}>
						<DialogContent dividers>
							<div className="containerPopUp">
								<CreateActivity token={this.state.token} username={this.state.username} parentCallback={this.callbackFunction} />
							</div>

						</DialogContent>
					</Dialog>
				</div>
			</div>
		);
	}
}
const testAativity = {
	nombre: "Torneo CSGO",
	banner: "https://www.rogowaylaw.com/wp-content/uploads/rogoway-law-los-angeles-office-1024x683.jpg",
	descripcion: "Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota Un torneo de CSGO de forma remota "
}
export default Home; 
