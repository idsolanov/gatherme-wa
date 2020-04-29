import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import ImageUploader from 'react-images-upload';

import './Register.css';
class Register extends Component {

    constructor(props) {

        super(props);
        this.state={
          user: this.props.location.state.user,  
          test: "Hola",
          profilephoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
          nombre: "",
          biografia: "",
          edad: ""
          }

          this.onDrop = this.onDrop.bind(this);
          this.handleChange = this.handleChange.bind(this);


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
    onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
  }

  onImageChange = (event) => {

    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ profilephoto: e.target.result });
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    this.setState({ file: event.target.files[0] });
}

handleChange(event) {
  var prop = String(event.target.id);
  this.setState({
    [prop]: event.target.value
  });
}

      render(){
          console.log(this.state.user);
          let reactSwipeEl;
          return(
            <Container component="main" >
              <CssBaseline />
              <ReactSwipe
                className="carousel"
                swipeOptions={{ continuous: false }}
                ref={el => (reactSwipeEl = el)}
              >
                

                <div>
                  <div className="assistant_container">
                    <div className="register_card" >
                      <div className= "content">
                      <Grid
                            container
                            direction="column"
                            justify="center"
                            alignContent="stretch"
                            spacing={2}
                          >  
                          <Grid item>
                          <div className="image-upload">
                            < label htmlFor="file-input" >
                                <div className="profilepic">
                                    <img id="target" className="crop" src={this.state.profilephoto} ></img>
                                </div>
                            </label>
                            <input id="file-input" name="profilePhoto" type="file" onChange={this.onImageChange} />
                        </div>
                          </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                            wrap="nowrap" 
                          > 
                          <Grid item xs={9}>
                            < this.StyledTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="nombre"
                            label="Nombre completo"
                            name="nombre"
                            autoComplete="nombre"
                            onChange={this.handleChange}
                            helperText={this.state.cityError && this.state.city == "" ? "Este campo es obligatorio" : ""}
                        />
                          </Grid>
                          <Grid item xs={3}>
                            < this.StyledTextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              id="edad"
                              label="Edad"
                              name="edad"
                              autoComplete="edad"
                              onChange={this.handleChange}
                              helperText={this.state.cityError && this.state.city == "" ? "Este campo es obligatorio" : ""}
                            />
                          </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignContent="stretch"
                            spacing={2}
                          > 
                          <Grid item xs={12}
                          >
                          < this.StyledTextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              id="biografia"
                              label="Tu biografia"
                              name="biografia"
                              autoComplete="Biografia"
                              multiline
                              rows="6"
                              rowsMax="10"
                              onChange={this.handleChange}
                          />
                          </Grid>

                          </Grid>
                          <button onClick={() => reactSwipeEl.next()}>Next</button>
                      </div> 
                    </div>
                  </div>
                </div>

                <div>
                  <div className="assistant_container">
                    <div className="register_card" >
                      <div>
                        <p> En construccion</p>
                        <button onClick={() => reactSwipeEl.prev()}>Previous</button>
                      </div> 
                    </div>
                  </div>
                </div>
            </ReactSwipe>
            </Container>
            
            );
      }
}
export default Register; 