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


class Navbar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			searchType: 'Buscar por',
			query: '',
		};

	}

	render() {
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
										<IconButton color="contrast" onClick={this.props.toggleDrawer}><AcUnitIcon fontsize="large" /></IconButton>
										<IconButton color="contrast" onClick={this.props.toggleDrawer}><AccountBoxIcon fontsize="large" /></IconButton>
										<IconButton color="contrast" onClick={this.props.toggleDrawer}><MenuIcon fontsize="large" /></IconButton>
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
