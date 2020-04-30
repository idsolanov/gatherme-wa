import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { IconContext } from "react-icons";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { FaQuestionCircle } from 'react-icons/fa';
import route from '../Route';

import './SignUpCard.css';

class SignUpCard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			userData: '',
			email: '',
			username: '',
			showPassword: false,
			showConfirmPassword: false,
			password: '',
			confirmPassword: '',
			gender: '',
			city: '',
			emailError: false,
			emailErrorText: "",
			usernameError: false,
			passwordError: false,
			cityError: false,
			signUpError: false,
			signUpErrorText: "",

		};

		this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
		this.primaryColor = '#E94057';
		this.handleChange = this.handleChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleClickFinish = this.handleClickFinish.bind(this);
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);


		this.validateData = this.validateData;

		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

		this.handleMouseDownPassword = event => {
			event.preventDefault();
		};

		this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);

		this.handleMouseDownConfirmPassword = event => {
			event.preventDefault();
		};


		this.theme = createMuiTheme({
			palette: {
				primary: {
					main: this.primaryColor,
					contrastText: '#FFF',
				},
			},
		});


		this.StyledTextField = withStyles({
			root: {
				marginTop: '1.2vh',
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

		this.StyledButton = withStyles({
			root: {
				backgroundImage: this.gradient,
				fontFamily: 'Product Sans !important',
				borderRadius: 3,
				border: 0,
				color: 'white',
				height: 48,
				padding: '0 30px',
				boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
				margin: '1vh 0vw 1vh 0vh',
				fontSize: '1.05rem',
				transitionProperty: 'opacity',
				transitionDuration: '0.1s',
				'&:hover': {
					opacity: 0.9,
				},
				'&:active': {
					boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
				},
			},
			label: {
				textTransform: 'capitalize',
			},
		})(Button);


	}


	handleChange(event) {
		var prop = String(event.target.id);
		this.setState({
			[prop]: event.target.value
		});
	}

	handleClickShowPassword() {
		this.setState({
			showPassword: !this.state.showPassword
		});
	}

	handleClickShowConfirmPassword() {
		this.setState({
			showConfirmPassword: !this.state.showConfirmPassword
		});
	}

	handleGenderChange(event) {
		this.setState({
			gender: event.target.value
		});
	}

	handleClickFinish() {
		this.LinkElement.click();
	}

	validateData() {
		var flag = true;
		var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (this.state.email == "") {
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "Este campo es obligatorio" });
		} else if (!this.state.email.match(mailformat)) {
			console.log("in 2");
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "El email ingresado no es valido" });
		} else {
			this.setState({ emailError: false });
			this.setState({ emailErrorText: "" });
		}

		if (this.state.username == "") {
			flag = false;
			this.setState({ usernameError: true });
		} else {
			this.setState({ usernameError: false });
		}

		if (this.state.password.length < 2) {
			flag = false;
			this.setState({ passwordError: true });
		} else {
			this.setState({ passwordError: false });
		}

		if (this.state.city == "") {
			flag = false;
			this.setState({ cityError: true });
		} else {
			this.setState({ cityError: false });
		}

		if (this.state.gender == "") {
			console.log("se fue vacio")
			this.setState({
				gender: "Undefined"
			});
		}


		return flag;
	}


	render() {


		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="paper">
					<div className="internal_paper">
						<div className="title">
							<h1>Regístrate</h1>
						</div>
						<div className="error_msg" style={this.state.signUpError ? {} : { display: 'none' }}>
							<div className="help">
								<IconContext.Provider value={{ size: "2.2em ", className: 'help_icon' }}>
									<div>
										<FaQuestionCircle onClick={this.handleDialogOpen} />
									</div>
								</IconContext.Provider>
							</div>
							<span>{this.state.signUpErrorText}</span>
						</div>

						<Dialog onClose={this.handleDialogClose} aria-labelledby="customized-dialog-title" open={this.state.dialogOpen} fullWidth={true}>
							<DialogTitle className="dialog_title" id="customized-dialog-title" onClose={this.handleDialogClose}>
								¿Problemas con tu registro?
					</DialogTitle>
							<DialogContent dividers>
								<div className="dialog_content">
									<p>Es posible que ya hayas creado una cuenta anteriormente con la dirección de correo especificada,
								en ese caso te invitamos a <a href="/SignIn" > Iniciar sesión </a>
									</p>
								</div>
							</DialogContent>
							<DialogActions>
								<ThemeProvider theme={this.theme}>
									<Button onClick={this.handleDialogClose}>
										cerrar
						</Button>
								</ThemeProvider>
							</DialogActions>
						</Dialog>

						<form className="form" noValidate>

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								id="email"
								label="Correo electronico*"
								name="email"
								autoComplete="email"
								onChange={this.handleChange}
								error={this.state.emailError && this.state.email == ""}
								helperText={this.state.emailError || this.state.email == "" ? this.state.emailErrorText : ""}
							/>

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								id="username"
								label="Nombre de Usuario"
								name="username"
								autoComplete="username"
								onChange={this.handleChange}
								error={this.state.usernameError && this.state.username == ""}
								helperText={this.state.usernameError && this.state.username == "" ? "Este campo es obligatorio" : ""}
							/>

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								name="password"
								label="Contraseña*"
								id="password"
								autoComplete="current-password"
								type={this.state.showPassword ? 'text' : 'password'}
								value={this.state.password}
								onChange={this.handleChange}
								error={this.state.passwordError && this.state.password.length < 2}
								helperText={this.state.passwordError && this.state.password.length < 2 ? "La contraseña debe tener mínimo 7 caracteres" : ""}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={this.handleClickShowPassword}
												onMouseDown={this.handleMouseDownPassword}>
												{(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								name="confirmPassword"
								label="Confirmar contraseña*"
								id="confirmPassword"
								autoComplete="confirm password"
								type={this.state.showConfirmPassword ? 'text' : 'password'}
								value={this.state.confirmPassword}
								onChange={this.handleChange}
								error={
									this.state.confirmPassword != this.state.password
								}
								helperText={
									this.state.confirmPassword != this.state.password ? "Las contraseñas deben coincidir" : ""
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={this.handleClickShowConfirmPassword}
												onMouseDown={this.handleMouseDownConfirmPassword}>
												{(this.state.showConfirmPassword) ? (<VisibilityOff />) : (<Visibility />)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<ThemeProvider theme={this.theme}>
								<div className="columns_container">
									<Grid container
										spacing={2}
										direction="row"
										justify="center"
										alignItems="center"
										wrap="nowrap" >
										< Grid item xs={7}>
											< this.StyledTextField
												variant="outlined"
												margin="normal"
												fullWidth
												id="city"
												label="Ciudad de Residencia"
												name="city"
												autoComplete="city"
												onChange={this.handleChange}
												error={this.state.cityError && this.state.city == ""}
												helperText={this.state.cityError && this.state.city == "" ? "Este campo es obligatorio" : ""}
											/>
										</Grid>
										< Grid item xs={5}>
											<FormControl
												variant="outlined"
												fullWidth>
												<InputLabel htmlFor="outlined-age-simple">
													Género
												</InputLabel>
												<Select
													fullWidth
													value={this.state.gender}
													onChange={this.handleGenderChange}
													labelWidth={54}
													inputProps={{
														gender: 'age',
														id: 'outlined-age-simple',
													}}
												>
													<MenuItem value="Men">Hombre</MenuItem>
													<MenuItem value="Women">Mujer</MenuItem>
													<MenuItem value="Undefined">Indefinido</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</div>
							</ThemeProvider>
							<div>
								<this.StyledButton onClick={() => {
									if (this.validateData()) {
										if (this.state.gender == "") {
											console.log("se fue vacio")
											this.setState({
												gender: "Undefined"
											});
										}

										axios({
											url: 'http://127.0.0.1:9001/graphql',
											method: 'post',
											data: {
												query: `
											  query {
												userByEmail(email: "${this.state.email}") {
												  id
												  username
												  email
												  activities
												  communities
												}
											  }
												`
											}
										}).then((result) => {

											if (result.data.data == null) {
												console.log(result.data)
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
														}
													  }
														`
													}
												}).then((result) => {

													if (result.data.data == null) {
														console.log(result.data)
														this.handleClickFinish();
													}
													else {

														this.setState({
															signUpErrorText: "Ya existe una cuenta registrada con este nombre de usuario."
														});

														this.setState({
															signUpError: true
														});

													}

												}, (error) => {
													console.log(error);
													this.setState({
														signUpError: true
													});
												});
											}
											else {

												this.setState({
													signUpErrorText: "Ya existe una cuenta registrada con este correo electronicó."
												});

												this.setState({
													signUpError: true
												});

											}

										}, (error) => {
											console.log(error);
											this.setState({
												signUpError: true
											});
										});






									}
								}}
									fullWidth
									focusRipple
									variant="contained"
									size="medium"
									text="bold"
								> Regístrate
						</this.StyledButton>
								<Link to={{
									pathname: '/Register',
									state: {
										user: {
											username: this.state.username,
											email: this.state.email,
											password: this.state.password,
											gender: this.state.gender,
											city: this.state.city,
										}
									}
								}}
									ref={
										Link => this.LinkElement = Link
									}>
								</Link>
							</div>

						</form>
					</div>
				</div>
				<Box mt={5}>
					< div className="login_link" >
						<p className="login_text">
							¿Ya tienes una cuenta? <a href="/SignIn" > Inicia sesión </a>
						</p>
					</div>
				</Box>
			</Container>
		);
	}
}

export default SignUpCard;