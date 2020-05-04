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
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import LocalOfferIcon from '@material-ui/icons/LocalOffer';






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

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			test: "user1",
			isOpen: true,
			userData: "",
			username: this.props.location.state.userData.nickName,
			token: this.props.location.state.userData.token,
			activitiesToRender: [],
			activityList: []
		}
		this.renderActivities = this.renderActivities.bind(this);
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

		axios({
			url: 'http://127.0.0.1:9001/graphql',
			method: 'post',
			data: {
				query: `
				query{
					getAllActivities{
						informacion
						nombre
						descripcion
						lista_miembros
						likes
						notas_adicionales
						categoria
						recurrente
						lugar
						hora
						fecha
						banner
						administrador
					  comments {
						id
						content
						date
					  }
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
			console.log("-----a-------")
			activityObjects.push(

				<Grid
					container
					spacing={4}
					direction="row"
					justify="center">
					<Grid item xs={4}>
						{(i < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i]} /> : ""}
					</Grid>
					<Grid item xs={4}>
						{(i + 1 < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i + 1]} /> : ""}
					</Grid>
					<Grid item xs={4}>
						{(i + 2 < maxSize) ? <ActivityCard activityData={this.state.activitiesToRender[i + 2]} /> : ""}
					</Grid>
				</Grid>

			);
		}

		this.setState({
			activityList: activityObjects
		})
	}

	render() {
		console.log(this.state.userData);
		console.log(this.state.token);
		console.log(this.state.activityList)
		return (
			<div className="Home">
				<NavBar />
				<div className="content_home">

					<Grid container
						spacing={5}
						direction="row"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap" >

						< Grid item xs={2}>
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
										background="blue"
										size={40}
										onClick={() => console.log('First button clicked')}
									/>



									<ChildButton className="test"
										icon={<StyledTooltip title="Deporte" placement="right"><SportsFootballIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"

										size={40}

									/>




									<ChildButton
										icon={<StyledTooltip title="Juegos" placement="right"><SportsEsportsIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
									/>
									<ChildButton
										icon={<StyledTooltip title="Cultural" placement="right"><SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
									/>
									<ChildButton
										icon={<StyledTooltip title="Comidas" placement="right"><FastfoodIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
									/>
									<ChildButton
										icon={<StyledTooltip title="Fiesta" placement="right"><SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
									/>
									<ChildButton
										icon={<StyledTooltip title="Otros" placement="right"><SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
									/>
								</FloatingMenu>
							</div>

						</Grid>
						< Grid item xs={9}>
							<div className="activity_container">
								{this.state.activityList}
							</div>
						</Grid>
						<div className=" add_container">
							< Grid item xs={1}>
								<StyledTooltip title="Crear Actividad" placement="left">
									<Fab color="primary" aria-label="add" >
										<MdAdd style={{ fontSize: 25 }} />
									</Fab>

								</StyledTooltip>

							</Grid>
						</div>
					</Grid>
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
export default SignIn; 
