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
import axios from 'axios';


import './Register.css';
import { DialogContent } from "@material-ui/core";
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
            Academico: ["Estudiar", "Tareas", "Investigacion", "Trabajar", "Traducir"],
            Deporte: ["Correr", "bailar","Gimnacio"],
            Juegos: ["VideoJuegos","Parques", "Online"],
            Cultural: ["Teatro","Cine","Concierto"],
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
          token:"",
          id: ""

          }
          this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
          this.onDrop = this.onDrop.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleChangeCategory = this.handleChangeCategory.bind(this);
          this.callbackFunction - this.callbackFunction.bind(this);
          this.addLike = this.addLike.bind(this);  
          this.handleTagsDelete = this.handleTagsDelete.bind(this);
          this.sendData = this.sendData.bind(this);
          this.setLikes = this.setLikes(this);


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

    componentDidMount(){

      console.log("Esta weada se esta ejecutando");

      let all= {
        Academico: [],
        Deporte: [],
        Juegos: [],
        Cultural: [],
        Comidas: [],
        Fiesta: [],
        Otros: []

      } 
      axios({
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
        url: "http://localhost:9001/graphql",
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
  console.log( "callBak",childData)
  this.setState({
    newLikeCategory: childData[0],
    newLikeContent: childData[1],
    newLikesList: this.state.newLikesList.concat({category: childData[0], like: childData[1]})
  })
  this.addLike( childData[1])
}

handleTagsDelete(tag) {
  console.log(tag)
  let k = this.state.newLikesList;
  this.state.newLikesList.forEach(element=>{
    let ind = tag.indexOf(element.like);
    if( ind == -1){
      k.splice(ind, 1);
    }
  })
  this.setState({
    likesSelected: tag,
    newLikesList: k
  })
}

sendData(){
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
  this.state.likesSelected.forEach(element=>{
    if(si < this.state.likesSelected.length){
      li += '"'+element+'",'
    }else{
      li += '"'+element+'"]'
    }
    si += 1
  })
  console.log(li)
   let kk = `
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
  `;

  console.log( kk)
  axios({
    url: "http://localhost:9001/graphql",
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
    /*let likesList = []
    let list = result.data.data.likeByCategory.forEach(element => {
      likesList.push(element.name)
    });
    console.log(likesList)
    all["Fiesta"] = likesList*/
    this.setState({
      token: result.data.data.register.token,
      id: result.data.data.register.id
    })
  });

}

setLikes(category){

}

      render(){
          
        
          console.log(this.state.data)
          console.log(this.state.user);
          console.log("categoria", this.state.gustoSeleccionado);
          console.log("Segunda lista", this.state.actualLikes);
          console.log("agregados",this.state.likesSelected);
          console.log("all", this.state.likesByCategory);
          console.log("POR agrega", this.state.newLikesList);
          let reactSwipeEl;
         
          const listItems = this.state.likesSelected.map(function(like){
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
                        <div className="search-likes">
                        <Grid
                            container justify="center" spacing={0}
                          >
                            <Grid item xs={4}>
                              <div className="bar-likes">

                                
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={categories}
                                  onChange={(event, value) => {
                                    this.handleChangeCategory(value)
                                  }} 
                                  getOptionLabel={(option) => option.name}
                                  style={{ width: 300 }}
                                  renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
                                  wrapperStyle={ {border: 0}}
                                />
                              </div>
                            
                            </Grid>
                            <Grid item xs={8}>
                              <div>
                              <Autocomplete
                                id="combo-box-demo-2"
                                options={this.state.actualLikes}
                                onChange={(event, value) => this.addLike(value)} 
                                getOptionLabel={(option) => option}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Gustos" variant="outlined" />}
                              />
                              </div>
                            </Grid>
                        </Grid>
                        </div>
                            <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                            spacing={3}
                          >
                            <Grid item xs={12}>
                              <div className="sugestions">

                              
                            <TagsInput
                              value={this.state.likesSelected}
                              onChange={this.handleTagsDelete}
                              label=""
                              >

                              </TagsInput>
                              </div>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                          >
                            <div className="open-dialog">
                              <FormDialog parentCallback = {this.callbackFunction}/> 
                            </div>
                            
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
                                <this.StyledButton button onClick={() => this.sendData()}
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