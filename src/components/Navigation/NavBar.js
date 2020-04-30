import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import axios from 'axios';



const styles = theme => ({
    root: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(5),
    	width: '100%'
    },
    menuButton: {
		marginRight: 20,
		width: '200px'
	},  
	formControl: {
		marginLeft: theme.spacing(20),
		marginRight: theme.spacing(3),
		marginTop: '4px',
		minWidth: '15ch',
		backgroundColor: '#EEE',
	},
	textField: {
		width: '70ch',
		backgroundColor: '#FFF',
		marginRight: theme.spacing(30)
	},
	appBar: {
		backgroundColor: '#055b5c'
	}
})


class Navbar extends Component {

	constructor(props) {
		super(props)		
		
		this.state = {
			searchType: '',
			query: '',
		};

	}

    render() {
		const {classes} = this.props;

		const handleChangeType = (event) => {
			this.setState( { searchType: event.target.value } );
		};

		const handleChangeQuery = (event) => {
			event.preventDefault();
			this.setState( { query: event.target.value } );
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
			<AppBar className={classes.appBar} position="static" elevation={0}>
				<Toolbar>
			
					<Typography type="title" variant="h4" color="inherit">
						Gatherme
					</Typography>  
							
					<FormControl className={classes.formControl}>
						<Select value={this.state.searchType} onChange={handleChangeType}>
							<MenuItem value={''}></MenuItem>
							<MenuItem value={'Actividad'}>Actividad</MenuItem>
							<MenuItem value={'Usuario'}>Usuario</MenuItem>
						</Select>
					</FormControl>

					<TextField className={classes.textField} label="Búsqueda" variant="outlined" 
					size="small" onChange={handleChangeQuery}/> 

					<IconButton color="contrast" onClick={this.props.toggleDrawer}><PeopleAltIcon fontsize="large"/></IconButton>            
					<IconButton color="contrast" onClick={this.props.toggleDrawer}><AcUnitIcon fontsize="large"/></IconButton>
					<IconButton color="contrast" onClick={this.props.toggleDrawer}><AccountBoxIcon fontsize="large"/></IconButton>
					<IconButton color="contrast" onClick={this.props.toggleDrawer}><MenuIcon fontsize="large"/></IconButton>			

				</Toolbar>
			</AppBar>
    	)
  	}
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
