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
import Search from './Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormDialog from './Sugestions'


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
          edad: "",
          likesByCategory: {
            Academico: ["Estudiar", "Tareas", "Investigacion"],
            Deporte: ["Correr", "bailar","Gimnacio"],
            Juegos: ["VideoJuegos","Parques", "Online"],
            Cultural: ["Teatro","Cine","Concierto"],
            Comidas: ["Cocinar", "Pizza", "Asado"],
            Fiesta: ["Fiesta", "LaBase"],
            Otros: ["Programar", "Dormir", "Charlar"]
          
          },
          gustosSeleccionados: [],
          newLikeCategory: "",
          newLikeContent: ""

          }
          this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
          this.onDrop = this.onDrop.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleChangeCategory = this.handleChangeCategory.bind(this);
          this.callbackFunction - this.callbackFunction.bind(this);
          /*this.addLike = this.addLike.bind(this);
          this.handleClickOpen = this.handleClickOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
*/
          


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

handleChangeCategory(value) {
  /*if (value == "Academico") {
    this.setState({
      gustosSeleccionados: likesByCategory[value]
    })
  }else if (value == "Juegos") {
    this.setState({
      gustosSeleccionados: likesByCategory[value]
    })
  }else if (value == "Cultural") {
    
  }else if (value == "Comidas") {
    
  }else if (value == "Fiesta") {
    
  }else if (value == "Deporte") {
    
  }else{

  }*/
  console.log(value)
  console.log(this.state.likesByCategory[value.name])
  this.setState({
    gustosSeleccionados: this.state.likesByCategory[value.name]
  })

}


callbackFunction = (childData) => {
  console.log( "callBak",childData)
  this.setState({
    newLikeCategory: childData[0],
    newLikeContent: childData[1]
  })
}


      render(){


          console.log(this.state.user);
          console.log(this.state.gustosSeleccionados);
          console.log("newCategory", this.state.newLikeCategory);
          console.log("newLike", this.state.newLikeContent);
          let reactSwipeEl;
         
          const listItems = this.state.gustosSeleccionados.map(function(like){
            var idstr = "checkbox" + like;
            return <ul className="ks-cboxtags-checked">
                <li>
                    <input type="checkbox" id={idstr}
                        value={like}
                    />
                    <label htmlFor={idstr}>{like}</label>
                </li>
             </ul>
          })

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
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-end"
                            spacing={3}
                          >
                            <Grid item xs={2}>
                              <this.StyledButton button onClick={() => reactSwipeEl.next()}
                              fullWidth
                              focusRipple
                              variant="contained"
                              size="medium"
                              text="bold"
                            >
                              Next
                            </this.StyledButton>
                            </Grid>
                          </Grid>
                      </div> 
                    </div>
                  </div>
                </div>

                <div>
                  <div className="assistant_container">
                    <div className="register_card" >
                      <div className="content">
                        <div className="content_center">    
                        <p>Añadir gustos</p>
                        <Grid
                            container justify="center" spacing={0}
                          >
                            <Grid item xs={4}>
                              <div>
                                
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={categories}
                                  onChange={(event, value) => this.handleChangeCategory(value)} 
                                  getOptionLabel={(option) => option.name}
                                  style={{ width: 300 }}
                                  renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
                                />
                              </div>
                            
                            </Grid>
                            <Grid item xs={8}>
                              <div>
                              <Autocomplete
                                id="combo-box-demo-2"
                                options={categories}
                                onChange={(event, value) => this.handleChangeCategory(value)} 
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Segudo" variant="outlined" />}
                              />
                              </div>
                            </Grid>
                        </Grid>
                            <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                            spacing={3}
                          >
                            <Grid item xs={12}>
                            <div className="sugestions">
                              {listItems}
                            </div>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                          >
                            <FormDialog parentCallback = {this.callbackFunction}/>
                          </Grid>
                          
                          <div>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-end"
                            spacing={3}
                          >
                            <Grid item xs={2}>
                              <this.StyledButton button onClick={() => reactSwipeEl.prev()}
                              fullWidth
                              focusRipple
                              variant="contained"
                              size="medium"
                              text="bold"
                            > 
                              Finalizar
                              </this.StyledButton>
                            </Grid>
                          </Grid>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
            </ReactSwipe>
            </Container>
            
            );
      }
}


const categories =[
  {name:"Academico"},
  {name:"Deporte"},
  {name:"Juegos"}, 
  {name:"Cultural"}, 
  {name:"Comidas"}, 
  {name:"Fiesta"},
  {name:"Otros"}
]
export default Register; 