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


import LocalOfferIcon from '@material-ui/icons/LocalOffer';






import './Home.css';

const StyledTooltip = withStyles((theme) => ({
	tooltip: {
	  backgroundColor: theme.palette.common.white,
	  color: 'rgba(0, 0, 0, 0.87)',
	  boxShadow: theme.shadows[1],
	  borderRadius:'10px',
	  fontSize: 13,
	},
  }))(Tooltip);

class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			test: "user1",
			isOpen: false,
		}
	}

	render() {
		console.log(this.state.test);
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
										iconResting={<LocalOfferIcon style={{ fontSize: 20 }} nativeColor="white" />}
										iconActive={<MdClose style={{ fontSize: 20 }} nativeColor="white" />}
										backgroundColor="black"
										onClick={() => this.setState({ isOpen: !this.state.isOpen })}
										size={56}
									/>

									<ChildButton
										icon={<StyledTooltip title="Academico" placement="right"><SchoolIcon style={{ fontSize: 25 }} nativeColor="black" /></StyledTooltip>}
										backgroundColor="white"
										size={40}
										onClick={() => console.log('First button clicked')}
									/>

									<ChildButton
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




							</div>
						</Grid>
						<div className=" add_container">
							< Grid item xs={1}>
								<Fab color="primary" aria-label="add" >
									<MdAdd style={{ fontSize: 20 }} />
								</Fab>
							</Grid>
						</div>
					</Grid>
				</div>
			</div>
		);
	}
}

export default SignIn; 
