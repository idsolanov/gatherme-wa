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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CreateActivity from '../CreateActivity/CreateActivity'





import './Home.css';

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
			createActivityDialogOpen: false,
			createActivity: false
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
		this.handleDialogOpen = this.handleDialogOpen.bind(this);
	  this.handleDialogClose = this.handleDialogClose.bind(this);
	  this.callbackFunction = this.callbackFunction.bind(this);
	}

	handleDialogOpen(){
        this.setState({ createActivityDialogOpen: true});
    }

    handleDialogClose(){
        this.setState({ createActivityDialogOpen: false});
	}
	
	callbackFunction(childData){
        this.setState({
            createActivity: childData[0],
        });
	}
	componentDidUpdate(){
        if (this.state.createActivity){
            this.setState({createActivity: false});
            this.handleDialogClose();
            this.componentDidMount();
		}
	}
	

	render() {
		console.log(this.state.userData);
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




							</div>
						</Grid>
						<div className=" add_container">
							< Grid item xs={1}>
							<StyledTooltip title="Crear Actividad" placement="left" >
                    <Fab color="primary" aria-label="add" onClick={this.handleDialogOpen} >
                        <MdAdd style={{ fontSize: 25 }}  />
                    </Fab>
                </StyledTooltip>
								

									{/* <div className="new_cat_bottom">
										<div className="open-dialog">
											<ActivityAssistant parentCallback={this.callbackFunction} />
										</div>

									</div> */}

								

							</Grid>
						</div>
					</Grid>
					<Dialog onClose={this.handleDialogClose} aria-labelledby="customized-dialog-title" open={this.state.createActivityDialogOpen} fullWidth={true}>
                            <DialogContent dividers>
								<div className ="containerPopUp">
								<CreateActivity  parentCallback = {this.callbackFunction}/>
								</div>
                             
                            </DialogContent>
                    </Dialog>
				</div>
			</div>
		);
	}
}

export default SignIn; 
