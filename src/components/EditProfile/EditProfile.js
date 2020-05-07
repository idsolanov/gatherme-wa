import React, { Component } from "react";
import NavBar from '../Navigation/NavBar'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Route from '../Route';
import './EditProfile.css';


class EditProfile extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			userData: "",
			temp_name: "",
			temp_picture: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
			temp_description: "",
			temp_gender: "",
			temp_age: 0,
			temp_city: "",
			username: this.props.location.state.userData.username,
			token: this.props.location.state.userData.token
			/*id: "user_test",
			username: "test1",
			name: "Usuario de Prueba",
			email: "example@mail.com",
			picture: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
			description: "Este es un usuario de prueba jsjs",
			gender: "Mujer",
			age: 20,
			city: "Cali"*/
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.onGenderChange = this.onGenderChange.bind(this);
		
		this.StyledTextField = withStyles({
		  root: {
		    width: '100%',
		    fontFamily: 'Product Sans',
		    '& label.Mui-focused': {
		      color: this.primaryColor,
		    },
		    '& .MuiInput-underline:after': {
		      borderBottomColor: this.primaryColor,
		    },
		    '& .MuiOutlinedInput-root': {
		      '& fieldset': {
		        borderColor: 'rgba(0, 0, 0, 0.3);',
		      },
		      '&:hover fieldset': {
		        borderColor: 'rgba(0, 0, 0, 0.6);',
		      },
		      '&.Mui-focused fieldset': {
		        borderColor: this.primaryColor,
		      },
		    },
		  },
		})(TextField);

	}

	componentDidMount() {
		
		axios({
			url: Route.url,
			method: 'GET',
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
					  gender
					  age
					  city
					  likes
					  communities
					  activities
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
		
		this.state.temp_description = this.state.userData.description;
		this.state.temp_name = this.state.userData.name;
		this.state.temp_age = this.state.userData.age;
		this.state.temp_gender = this.state.userData.gender;
		this.state.temp_city = this.state.userData.city;
		
	}

	handleChange(event) {
		var prop = String(event.target.id);
		this.setState({
			[prop]: event.target.value,
		});
	}
	
	onGenderChange(event) {
		this.setState({
			temp_gender: event.target.value,
		});
	}
	
	handleSubmit(event) {
		
        axios({
			url: Route.url,
			method: 'PUT',
			data: {
				query: `
				   mutation{
					   updateUser(
					       user:{
						        id: ${this.state.userData.id}
							username: ${this.state.username}
							email: ${this.state.userData.email}
							description: ${this.state.temp_description}
							picture: ${this.state.temp_picture}
							name: ${this.state.temp_name}	
							gender: ${this.state.temp_gender}
							age: ${this.state.temp_age}
							city: ${this.state.temp_city}
							likes: ${this.state.userData.likes}
							communities: ${this.state.userData.communities}
							activities: ${this.state.userData.activities}
							gathers: ${this.state.userData.gathers}
	                       			}   
	                   		)
	               		   }
				`
			}
		}).then((response) => {
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });

        //Esto cierra el popup
        this.props.parentCallback([true]);
    }
    

	render() {
		console.log(this.state.userData);
		
		const genders = [
		  { value: 'Masculino', label: 'Masculino' },
		  { value: 'Femenino', label: 'Femenino' },
		  { value: 'Otro', label: 'Otro' }
		];
		
		return (
			<div className="EditProfile">
				<NavBar token={this.state.token} />
				<div className="edit-profile-content">
					<Grid container
						spacing={2}
						direction="column"
						justify="center"
						alignItems="flex-start"
						wrap="nowrap" >
						
						<Grid item xs={12}>
						  <div className="edit-title">
							<h2 align="center">Edita tu perfil</h2>
						  </div>
						</Grid>

						<Grid item xs={12}>
							<div className="edit-profile-form">
								<Grid container
									spacing={1}
									direction="row"
									alignItems="flex-start"
									wrap="nowrap" >
									
									<Grid item xs={5} className="edit-photo-container">
										<div className="profilephoto">
											<img className="adjust_photo" 
											     src={this.state.temp_picture} ></img>
										</div>
									</Grid>
									
									<Grid item xs={8} className="edit-form-info">
										<Grid container 
											spacing={1}
											direction="column"
											alignItems="flex-start"
											wrap="nowrap" >
											
												<this.StyledTextField
										              variant="outlined"
										              disabled
										              margin="normal"
										              id="temp_username"
										              label="Nickname"
										              defaultValue={this.state.username}
										        />
										        <this.StyledTextField
										              variant="outlined"
										              disabled
										              margin="normal"
										              id="temp_email"
										              label="Email"
										              defaultValue={this.state.userData.email}
										        />
										   
												<this.StyledTextField
													  required
										              variant="outlined"
										              margin="normal"
										              id="temp_name"
										              label="Nombre completo"
										              defaultValue={this.state.temp_name}
										              onChange={this.handleChange}
										        />
										        
												<this.StyledTextField
													  required
										              variant="outlined"
										              margin="normal"
										              id="temp_city"
										              label="Ciudad"
										              defaultValue={this.state.temp_city}
										              onChange={this.handleChange}
										        />
										        
										        <Grid container
												    spacing={1}
													direction="row"
													alignItems="center"
													wrap="nowrap" >
													<div style={{ marginRight: '15px' }}>
														<this.StyledTextField
															  required
															  variant="outlined"
															  type="number"
															  margin="normal"
															  id="temp_age"
															  label="Edad"
															  defaultValue={this.state.temp_age}
															  onChange={this.handleChange}
														/>
													</div>
												    <this.StyledTextField
												    	  required select
												          variant="outlined"
												          margin="normal"
												          id="temp_gender"
												          label="Género"
												          defaultValue={this.state.temp_gender}
												          onChange={this.onGenderChange}>
														      {genders.map((option) => (
																<MenuItem key={option.value} 
																	value={option.value}>
																  {option.label}
																</MenuItem>
															  ))}
												    </this.StyledTextField>
										    	</Grid>
										    	
										    	< this.StyledTextField
											        variant="outlined"
											        margin="normal"
											        fullWidth
											        id="temp_description"
											        label="Tu biografía"
											        name="biografia"
											        multiline
											        rows="6"
											        rowsMax="10"
											        defaultValue={this.state.temp_description}
											        onChange={this.handleChange}
											    />
										    
											<Grid item xs={8}>
									          <div className="edit-submit-button" 
									            onClick={this.handleSubmit}>
							                    <p>Finalizar</p>
							                  </div>
										    </Grid>	
										</Grid>
									</Grid>	
								</Grid>
							</div>
						</Grid>
						
					</Grid>
				</div>
			</div>
		);
	}
}

export default EditProfile; 
