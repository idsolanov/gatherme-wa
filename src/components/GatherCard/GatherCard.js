import React, { Component } from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MdAdd from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import './GatherCard.css';

const StyledTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        borderRadius: '10px',
        fontSize: 13,
    },
}))(Tooltip);


class GatherCard extends Component {

    constructor(props) {

        super(props);
        this.state = {
            username: this.props.username,
            gatherUser: this.props.gatherUser,
            gatherData: "",
            token: this.props.token,
            profilePhoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg"

        }
        this.handleAccept = this.handleAccept.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
        this.handleToOtherProfile = this.handleToOtherProfile.bind(this);


    }

    handleAccept() {
        console.log("accept");

    }
    handleDecline() {
        console.log("decline");

    }

    handleToOtherProfile(){
        this.LinkOtherProfile.click();
    }


    componentDidMount() {
        axios({
            url: 'http://127.0.0.1:9001/graphql',
            method: 'post',
            data: {
                query: `
			  query {
				userByUsername(username: "${this.state.gatherUser}") {
				  id
				  username
				  picture
				  name
				}
			  }
				`
            }
        }).then((result) => {
            this.setState({
                gatherData: result.data.data.userByUsername,

            });
        }, (error) => {
            console.log(error);
        });
    }

    render() {

        return (
            <div className="gather_card">
                <div className="gather_card_content">
                    <Grid container
                        spacing={5}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        wrap="nowrap" >
                        < Grid item xs={2}>
                            <div className="gather_profilephoto">
                                <img className="gather_adjust_photo" src={this.state.gatherData.picture} ></img>
                            </div>

                        </ Grid>

                        < Grid item xs={5}>
                            <div className="gather_info">
                                <p className="gather_name" onClick={this.handleToOtherProfile}>{this.state.gatherData.name}</p>
                                <p className="gather_username">{this.state.gatherData.username}</p>

                            </div>

                        </ Grid>
                        < Grid item xs={5}>
                            <div className="gather_buttons">
                                <div className="accept_button_gather">
                                    <StyledTooltip title="Aceptar Solicitud" placement="left" >
                                        <Fab color="primary" aria-label="add" onClick={this.handleAccept} >
                                            <CheckIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>

                                </div>
                                <div className="decline_button_gather">
                                    <StyledTooltip title="Rechazar Solicitud" placement="left" >
                                        <Fab color="primary" aria-label="add" onClick={this.handleDecline} >
                                            <CloseIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                </div>



                            </div>
                        </ Grid>
                    </Grid>

                </div>
                <Link to={{
                    pathname: '/Profile/'+this.state.gatherUser,
                    state: {
                        userData: {
                            nickName: this.state.username,
                            token: this.state.token,
                        }
                    }
                }}
                    ref={
                        Link => this.LinkOtherProfile = Link
                    }>
                </Link>
            </div>

        );
    }
}
export default GatherCard;  