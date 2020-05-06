import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import { Link } from 'react-router-dom';


import './NavBar.css';


import axios from 'axios';


const styles = theme => ({
	root: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(4),

	},
	menuButton: {
		marginRight: 20,
		width: '200px'
	},
	formControl: {

		backgroundColor: '#EEE',
		width: '100%',
		height: '100%',

	},
	textField: {

		backgroundColor: '#FFF',
	},
	appBar: {
		backgroundColor: '#08979D'
	}
})

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));


const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: '#40989d',
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);





class Navbar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			searchType: 'Buscar por',
			query: '',
			token: this.props.token,
			username: this.props.username,
			anchorEl: null,
			anchorOriginVertical: 'bottom',
			anchorOriginHorizontal: 'right',
			transformOriginVertical: 'top',
			transformOriginHorizontal: 'right',
			anchorReference: 'anchorEl',
		};

		this.handleMenu = this.handleMenu.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.logout = this.logout.bind(this);
		this.handleToProfile = this.handleToProfile.bind(this);
		this.handleToHome = this.handleToHome.bind(this);



	}
	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	logout() {
		console.log("Se cerro sesion")
		axios({
			url: 'http://127.0.0.1:9001/graphql',
			method: 'post',
			data: {
				query: `
				mutation{
					singOut(
						token:{
							token: "${this.state.token}"
						}
					){
						message 
						
					}
				}
				`
			}
		}).then((result) => {

			console.log(result.data.data.singOut)
			this.LinkLogOut.click();

		}, (error) => {
			console.log(error);
		});
	}

	handleToProfile() {
		this.LinkProfile.click();
	}

	handleToHome(){
		this.LinkHome.click();
	}




	render() {
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const { classes } = this.props;

		const handleChangeType = (event) => {
			this.setState({ searchType: event.target.value });
		};

		const handleChangeQuery = (event) => {
			event.preventDefault();
			this.setState({ query: event.target.value });
			axios({
				url: "http://localhost:9001/graphql",
				method: 'get',
				data: {
					query: `
						query{
							getAllActivities{
								id
								informacion
								descripcion
								administrador
								lugar
								fecha
							}
						}
					`
				}
			}).then((result) => {
				console.log(result.data)
			});
		};





		return (
			<div className="nav_container">
				<AppBar className={classes.appBar} position="static" elevation={0}>
					<Toolbar>


						<div className="columns_container">
							<Grid container
								spacing={5}
								direction="row"
								justify="center"
								alignItems="center"
								wrap="nowrap" >
								< Grid item xs={2}>
									<Typography type="title" variant="h4" color="inherit">
										Gatherme
								</Typography>

								</Grid>
								< Grid item xs={6}>





									<div className="search_bar">
										<Grid container
											spacing={0}
											direction="row"
											justify="center"
											alignItems="stratch"
											wrap="nowrap" >
											< Grid item xs={2}>

												<select className="search_select" value={this.state.searchType} onChange={handleChangeType}>
													<option value={''}>Buscar por</option>
													<option value={'Actividad'}>Actividad</option>
													<option value={'Usuario'}>Usuario</option>
												</select>

											</Grid>
											< Grid item xs={10}>
												<form className="search-container">
													<input type="text" id="search-bar" placeholder="Busqueda">
													</input>
												</form>

											</Grid>
										</Grid>
									</div>



								</Grid>
								< Grid item xs={3}>
									<div className="icons_cont">
										<IconButton color="contrast" onClick={this.props.toggleDrawer}><PeopleAltIcon fontsize="large" /></IconButton>
										<IconButton color="contrast" onClick={this.handleToHome}><EventIcon fontsize="large" /></IconButton>
										<IconButton
											aria-owns={open ? 'menu-appbar' : null}
											aria-haspopup="true"
											onClick={this.handleMenu}
											color="contrast">
											<MenuIcon fontsize="large" />
										</IconButton>

										<StyledMenu
											disableAutoFocusItem
											id="menu-appbar"
											anchorEl={anchorEl}
											open={open}
											onClose={this.handleClose}
										>
											<StyledMenuItem onClick={this.handleToProfile}>
												<ListItemIcon>
													<PersonIcon fontSize="medium" />
												</ListItemIcon>
												<ListItemText primary="Mi Perfil" />
											</StyledMenuItem>
											<StyledMenuItem>
												<ListItemIcon>
													<SettingsIcon fontSize="medium" />
												</ListItemIcon>
												<ListItemText primary="Preferencias" />
											</StyledMenuItem>
											<StyledMenuItem onClick={this.logout}>
												<ListItemIcon>
													<ExitToAppIcon fontSize="medium" />
												</ListItemIcon>
												<ListItemText primary="Cerrar Sesión" />
											</StyledMenuItem>
										</StyledMenu>

										<Link to={{
											pathname: '/SignIn',
										}}
											ref={
												Link => this.LinkLogOut = Link
											}>
										</Link>
										<Link to={{
											pathname: '/MyProfile',
											state: {
												userData: {
													username: this.state.username,
													token: this.state.token,
												}
											}
										}}
											ref={
												Link => this.LinkProfile = Link
											}>
										</Link>

										<Link to={{
											pathname: '/Home',
											state: {
												userData: {
													nickName: this.state.username,
													token: this.state.token
												}
											}
										}}
											ref={
												Link => this.LinkHome = Link
											}>
										</Link>
									</div>


								</Grid>
							</Grid>
						</div>



					</Toolbar>
				</AppBar>
			</div>

		)
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
