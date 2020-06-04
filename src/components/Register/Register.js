import React, { Component } from "react";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TagsInput from 'react-tagsinput'
import FormDialog from './Sugestions'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as firebase from 'firebase'

import Route from '../Route'
import './Register.css';
import { DialogContent } from "@material-ui/core";




firebase.initializeApp({
  apiKey: "AIzaSyANbePRGIUuLOCay45dasl6398XNyUhRrw",
    authDomain: "gatherme-bc1b6.firebaseapp.com",
    databaseURL: "https://gatherme-bc1b6.firebaseio.com",
    projectId: "gatherme-bc1b6",
    storageBucket: "gatherme-bc1b6.appspot.com",
    messagingSenderId: "1070796727566",
    appId: "1:1070796727566:web:9feebc54e3fd0d1af9235f",
    measurementId: "G-CX75M6BGWV"
})

class Register extends Component {

  constructor(props) {

    super(props);
    this.state = {
      user: this.props.location.state.user,
      test: "Hola",
      profilephoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
      nombre: "",
      biografia: "Aca hay contenido",
      edad: "",
      likesByCategory: {
        Academico: ["Estudiar", "Tareas", "Investigacion", "Trabajar", "Traducir"],
        Deporte: ["Correr", "bailar", "Gimnacio"],
        Juegos: ["VideoJuegos", "Parques", "Online"],
        Cultural: ["Teatro", "Cine", "Concierto"],
        Comidas: ["Cocinar", "Pizza", "Asado"],
        Fiesta: ["Fiesta", "LaBase"],
        Otros: ["Programar", "Dormir", "Charlar"]

      },
      gustoSeleccionado: "",
      actualLikes: [],
      newLikeCategory: "",
      newLikeContent: "",
      likesSelected: [],
      data: [],
      newLikesList: [],
      token: "",
      id: "",
      file: "",
      sendphoto: "",

    }
    this.gradient = 'linear-gradient(136deg, #055B5C 0%, #40989d 50%)';
    this.onDrop = this.onDrop.bind(this);
    this.primaryColor = '#40989d';
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.callbackFunction = this.callbackFunction.bind(this);
    this.addLike = this.addLike.bind(this);
    this.handleTagsDelete = this.handleTagsDelete.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sendNewLike = this.sendNewLike.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.writeImage = this.writeImage.bind(this);
    


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

    this.StyledAutocomplete = withStyles({
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
    })(Autocomplete);


    this.StyledButton = withStyles({
      root: {
        backgroundImage: this.gradient,
        fontFamily: 'Product Sans !important',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        width: '25%',
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

    this.StyledButtonFinish = withStyles({
      root: {
        backgroundImage: this.gradient,
        fontFamily: 'Product Sans !important',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        width: '50%',
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

  componentDidMount() {

    console.log("Esta weada se esta ejecutando");

    let all = {
      Academico: [],
      Deporte: [],
      Juegos: [],
      Cultural: [],
      Comidas: [],
      Fiesta: [],
      Otros: []

    }
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Deporte"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let arr = result.data.likesByCategory
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Deporte"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Academico"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Academico"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Juegos"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Juegos"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Cultural"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Cultural"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Comidas"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Comidas"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Fiesta"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Fiesta"] = likesList
    });
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
          query{
            likeByCategory(name:"Otros"){
              name
            }
          }
          `
      }
    }).then((result) => {
      console.log(result.data)
      let likesList = []
      let list = result.data.data.likeByCategory.forEach(element => {
        likesList.push(element.name)
      });
      console.log(likesList)
      all["Otros"] = likesList
    });
    console.log(all)
    this.setState({
      likesByCategory: all
    })
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

  writeImage(path, file) {
    window.localStorage.setItem(path, file);
  }


  handleChangeCategory(value) {
    console.log(value.name)
    this.setState({
      gustoSeleccionado: String(value.name),
      actualLikes: this.state.likesByCategory[value.name]
    })

  }

  addLike(value) {
    this.setState({
      likesSelected: this.state.likesSelected.concat(value)
    })
  }

  callbackFunction = (childData) => {
    console.log("callBak", childData)
    this.setState({
      newLikeCategory: childData[0],
      newLikeContent: childData[1],
      newLikesList: this.state.newLikesList.concat({ category: childData[0], like: childData[1] })
    })
    this.addLike(childData[1])
  }

  handleTagsDelete(tag) {
    console.log(tag)
    let k = this.state.newLikesList;
    this.state.newLikesList.forEach(element => {
      let ind = tag.indexOf(element.like);
      if (ind == -1) {
        k.splice(ind, 1);
      }
    })
    this.setState({
      likesSelected: tag,
      newLikesList: k
    })
  }



  sendData() {
    console.log(String(this.state.profilephoto))
    console.log(this.state.nombre)
    console.log(parseInt(this.state.edad))
    console.log(String(this.state.biografia))
    console.log(String(this.state.likesSelected))
    console.log(String(this.state.user.username))
    console.log(String(this.state.user.email))
    console.log(String(this.state.user.password))
    console.log(String(this.state.user.gender))
    console.log(String(this.state.user.city))
    console.log(String(this.state.likesSelected))
    console.log(`likes: "${this.state.likesSelected}"`)

    

  

    let li = "["
        let si = 1
        if (this.state.likesSelected.length == 0) {
          li += "]"
        }
        this.state.likesSelected.forEach(element => {
          if (si < this.state.likesSelected.length) {
            li += '"' + element + '",'
          } else {
            li += '"' + element + '"]'
          }
          si += 1
        })

        if(this.state.file == ""){

          axios({
            url: Route.url,
            method: 'POST',
            data: {
              query: `
            mutation {
              register(user: {
                username : "${this.state.user.username}"
                name: "${this.state.nombre}"
                email: "${this.state.user.email}"
                password: "${this.state.user.password}"
                picture: "${this.state.profilephoto}"
                description: "${this.state.biografia}"
                gender: "${this.state.user.gender}"
                age: ${this.state.edad}
                city: "${this.state.user.city}"
                likes: ${li}
                communities: []
                activities: []
                gathers: []
                
              }){
                id
                username
                email
                token
              }
            }
            `
            }
          }).then((result) => {
            console.log(result.data)
            console.log(result.data.data.register.token)
            this.setState({
              token: result.data.data.register.token,
              id: result.data.data.register.id
            })
            console.log(this.state.token)
            this.state.newLikesList.forEach(element => {
              this.sendNewLike(element)
            })
            this.LinkElement.click();
          });

        }
        else{
          const storageRef = firebase.storage().ref(`Fotos/${this.state.user.username}`)
          const task = storageRef.put(this.state.file)
      
          task.on('state_changed', (snapshot) => {
          }, (error) => {
            console.error(error.message)
          }, () => {
            console.log("imagen subida")
            console.log()
            // Upload complete
            axios({
              url: Route.url,
              method: 'POST',
              data: {
                query: `
              mutation {
                register(user: {
                  username : "${this.state.user.username}"
                  name: "${this.state.nombre}"
                  email: "${this.state.user.email}"
                  password: "${this.state.user.password}"
                  picture: "${task.snapshot.downloadURL}"
                  description: "${this.state.biografia}"
                  gender: "${this.state.user.gender}"
                  age: ${this.state.edad}
                  city: "${this.state.user.city}"
                  likes: ${li}
                  communities: []
                  activities: []
                  gathers: []
                  
                }){
                  id
                  username
                  email
                  token
                }
              }
              `
              }
            }).then((result) => {
              console.log(result.data)
              console.log(result.data.data.register.token)
              this.setState({
                token: result.data.data.register.token,
                id: result.data.data.register.id
              })
              console.log(this.state.token)
              this.state.newLikesList.forEach(element => {
                this.sendNewLike(element)
              })
              this.LinkElement.click();
            });
      
          })
          



        }
        





  



  }


  sendNewLike(element) {
    let kk = `
  mutation {
    createLike(like: {
      category : "${element["category"]}"
      name: "${element["like"]}"
    },username: "${this.state.user.username}",token:"${this.state.token}"){
      id
      name
      category
    }
  }
  `
    console.log(this.state.token)
    console.log(kk);
    axios({
      url: Route.url,
      method: 'POST',
      data: {
        query: `
      mutation {
        createLike(like: {
          category : "${element["category"]}"
          name: "${element["like"]}"
        },username: "${this.state.user.username}",token:"${this.state.token}"){
          id
          name
          category
        }
      }
      `
      }
    }).then((result) => {
      console.log(result.data)

    });
  }



  render() {


    console.log(this.state.data)
    console.log(this.state.user);
    console.log("categoria", this.state.gustoSeleccionado);
    console.log("Segunda lista", this.state.actualLikes);
    console.log("agregados", this.state.likesSelected);
    console.log("all", this.state.likesByCategory);
    console.log("POR agrega", this.state.newLikesList);
    let reactSwipeEl;

    const listItems = this.state.likesSelected.map(function (like) {
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

    return (


      <div className="register_main">
        <CssBaseline />
        <div className="swipe_container">
          <ReactSwipe
            className="carousel"
            swipeOptions={{ continuous: false }}
            ref={el => (reactSwipeEl = el)}
          >
            <div >


              <div className="container_card_register">
                <div className="assistant_container">
                  <div className="register_card" >
                    <div className="content">
                      <div className="title_info">
                        <h1>Información Basica </h1>
                      </div>

                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignContent="stretch"
                        spacing={0}
                      >
                        <Grid item xs={4} className="grid_info_basic">
                          <div className="image-upload">
                            < label htmlFor="file-input" >
                              <div className="profilepic">
                                <img id="target" className="crop" src={this.state.profilephoto} ></img>
                              </div>
                            </label>
                            <input id="file-input" name="profilePhoto" type="file" onChange={this.onImageChange} />
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <p className="content_title_basic"> Empecemos con información basica, ¿Comó quieres que el mundo te vea?
                          recuerda que una imagen de perfil hace la diferencia
                             </p>
                          <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
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
                                type="number"
                                margin="normal"
                                fullWidth
                                id="edad"
                                label="Edad"
                                name="edad"
                                autoComplete="edad"
                                onChange={this.handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <p className="content_title_basic"> Hablanos un poco de ti, ¿No sabes que escribir? quizas algo gracioso.
                             </p>
                          <div class="bio_container_register">
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
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="next_container_register">
                            <this.StyledButton button onClick={() => reactSwipeEl.next()}
                              fullWidth
                              focusRipple
                              variant="contained"
                              size="medium"
                              text="bold"
                            >
                              Siguiente
                            </this.StyledButton>

                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div>
              <div className="container_card_register">
                <div className="assistant_container">
                  <div className="register_card" >
                    <div className="content">
                      <div className="content_center">
                        <div className="title">
                          <h1>Añadir Gustos </h1>
                        </div>

                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignContent="stretch"
                          spacing={2}
                        >
                          <Grid item xs={2} className="Grid_selector_cat">
                            <Grid container
                              direction="row"
                              spacing={2}
                            >
                              <Grid item xs={4}>

                                <this.StyledAutocomplete
                                  id="combo-box-demo"
                                  options={categories}
                                  onChange={(event, value) => {
                                    this.handleChangeCategory(value)
                                  }}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
                                  wrapperStyle={{ border: 0 }}
                                />


                              </Grid>
                              <Grid item xs={8}>

                                <this.StyledAutocomplete
                                  id="combo-box-demo-2"
                                  options={this.state.actualLikes}
                                  onChange={(event, value) => this.addLike(value)}
                                  getOptionLabel={(option) => option}

                                  renderInput={(params) => <TextField {...params} label="Gustos" variant="outlined" />}
                                />

                              </Grid>
                            </Grid>

                          </Grid>

                          <Grid item xs={6}>
                            <p className="content_title"> Los gustos son nuestra forma de conocerte y darte a conocer al mundo,
                            busca entre gustos ya creados por otros usuarios o crea uno tu mismo,
                            los gustos que selecciones apareceran a continuacion.
                             </p>
                            <div className="sugestions">

                              <TagsInput
                                value={this.state.likesSelected}
                                onChange={this.handleTagsDelete}
                                label=""
                              >
                              </TagsInput>
                            </div>


                          </Grid>

                          <Grid item xs={2}>
                            <div className="new_cat_bottom">
                              <div className="open-dialog">
                                <FormDialog parentCallback={this.callbackFunction} />
                              </div>

                            </div>






                          </Grid>

                          <Grid item xs={2}>
                            <div className="finish_container_register">
                              <div className="prev_container_register">
                                <this.StyledButtonFinish button onClick={() => reactSwipeEl.prev()}
                                  fullWidth
                                  focusRipple
                                  variant="contained"
                                  size="medium"
                                  text="bold"
                                >
                                  Anterior
                            </this.StyledButtonFinish>
                              </div>
                              <div className="finish_next_container_register">
                                <this.StyledButtonFinish button onClick={() => this.sendData()}
                                  fullWidth
                                  focusRipple
                                  variant="contained"
                                  size="medium"
                                  text="bold"
                                >
                                  Finalizar
                                </this.StyledButtonFinish>

                              </div>


                              <Link to={{
                                pathname: '/Home',
                                state: {
                                  userData: {
                                    nickName: this.state.user.username,
                                    token: this.state.token
                                  }
                                }
                              }}
                                ref={
                                  Link => this.LinkElement = Link
                                }>
                              </Link>


                            </div>



                          </Grid>

                        </Grid>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactSwipe>
        </div>
        <div className="background_overlay_reg">
        </div>
        <img
          className="image_background_reg"
          src=' https://raw.githubusercontent.com/nsaavedraa/imgs/master/background.jpg' />

      </div>




    );
  }
}


const categories = [
  { name: "Academico" },
  { name: "Deporte" },
  { name: "Juegos" },
  { name: "Cultural" },
  { name: "Comidas" },
  { name: "Fiesta" },
  { name: "Otros" }
]
export default Register; 