import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import {FaAngleLeft} from "react-icons/fa";
import {FaAngleRight} from "react-icons/fa";
import Dots from 'react-carousel-dots';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TagsInput from 'react-tagsinput'
import axios from 'axios';

import './CreateActivity.css';

class CreateActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            token: this.props.token,
            userData: this.props.userData,
            informacion: "",
            nombre: "",
            descripcion: "",
            lugar: "",
            fecha: "",
            hora: "",
            notas: "",
            recurrent: false,
            banner: "",
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            checked6: false,
            checked7: false,
            categories: [ "Academico", "Deporte",  "Juegos", "Cultural", "Comidas", "Fiesta", "Otros" ],
            selectedCategories: [],
            tags: []
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.onTagsChanged = this.onTagsChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRecChange = this.handleRecChange.bind(this);
        let assistantSwipe;

        this.StyledTextField = withStyles({
            root: {
                width: '60% !important',
                marginTop: '48px',
                fontFamily: 'Product Sans !important',
                '& label.Mui-focused': {
                    color: 'white',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
            },
        })(TextField);

        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: "#FFF",
                    contrastText: '#FFF',
                },
                secondary: {
                    main: "#FFF",
                },
                tr: {
                    background: "#f1f1f1",
                    '&:hover': {
                        background: "#FFF",
                    },
                },
            },
        });
    }

    handleNext(){
        this.assistantSwipe.next();
        if(this.state.step != 3){
            this.setState({
                step: this.state.step + 1
            });
        }

        if(this.state.step == 2){

            if (this.state.checked1) { this.state.selectedCategories.push(this.state.categories[0]); }
            if (this.state.checked2) { this.state.selectedCategories.push(this.state.categories[1]); }
            if (this.state.checked3) { this.state.selectedCategories.push(this.state.categories[2]); }
            if (this.state.checked4) { this.state.selectedCategories.push(this.state.categories[3]); }
            if (this.state.checked5) { this.state.selectedCategories.push(this.state.categories[4]); }
            if (this.state.checked6) { this.state.selectedCategories.push(this.state.categories[5]); }
            if (this.state.checked7) { this.state.selectedCategories.push(this.state.categories[6]); }
        }
    }

    handleBack(){
        this.assistantSwipe.prev();
        if (this.state.step != 0){
            this.setState({
                step: this.state.step - 1
            });
        }
    }

    handleTextInputChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleRecChange(event) {
        this.setState({ 
            recurrent: !this.state.recurrent 
        });
    }

    handleCategorySelected(event) {
        var prop = "checked" + event.currentTarget.id.toString();
        this.setState({
            [prop]: !this.state[prop]
        });
    }

    onTagsChanged(tags) {
        this.setState({ tags })
    }

    handleSubmit(event) {

        this.setState({ 
            informacion: `[Nombre:${this.state.nombre},Banner:${this.state.banner},Descripcion:${this.state.descripcion}] ` 
        });

        let strCategories = "[";
        let i = 1;
        if (this.state.selectedCategories.length == 0) {
            strCategories += "]"
        }
        this.state.selectedCategories.forEach(element => {
          if (i < this.state.selectedCategories.length) {
            strCategories += '"' + element + '",';
          } else {
            strCategories += '"' + element + '"]';
          }
          i += 1;
        })

        let strTags = "[";
        let j = 1;
        if (this.state.tags.length == 0) {
            strTags += "]"
        }
        this.state.tags.forEach(element => {
          if (i < this.state.tags.length) {
            strTags += '"' + element + '",';
          } else {
            strTags += '"' + element + '"]';
          }
          j += 1;
        })
        
        axios.post({
            url: "http://localhost:9001/graphql",
            method: 'post',
            data: {
                query: `
                    mutation{
                        createActivity(
                            activity:{
                                informacion:"${this.state.informacion}"
                                nombre: "${this.state.nombre}"
                                descripcion:"${this.state.descripcion}"
                                lista_miembros: ["${this.state.userData.username}"]
                                tags_especificos: ${strTags}
                                notas_adicionales: ${this.state.notas}
                                categoria: ${strCategories}
                                recurrente: ${this.state.recurrent.toString()}
                                lugar: "${this.state.lugar}"
                                hora: "${this.state.hora}"
                                fecha:"${this.state.fecha}"
                                banner: "${this.state.banner}"
                                administrador: "${this.state.userData.username}"
                                }, 
                            token:
                                ${this.state.token}
                            }){
                        id
                        }
                    }
                `
            }

        }).then((response) => {
                console.log(response.data);
            },(error) => {
                console.log(error);
            });

        //Esto cierra el popup
        this.props.parentCallback([true]);
    }


    render(){

        return(
            <div className="activity_basic_container">
                <div className="container">
                    
                    <IconContext.Provider value={{ size: "2.5em ", className: 'left_arrow'}}>
                        <FaAngleLeft onClick={this.handleBack}/>
                    </IconContext.Provider>

                    <IconContext.Provider value={{ size: "2.5em ", className: 'right_arrow'}}>
                        <FaAngleRight onClick={this.handleNext}/>
                    </IconContext.Provider>

                    <ReactSwipe
                        className = "carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (this.assistantSwipe = el)}>
                        
                        <div className="container_content">
                            
                            <h1>Crear Actividad</h1>
                            <h3>Paso 1: Información básica</h3>

                            <p>Define un nombre para tu actividad:</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "nombre"
                                label = "Nombre de la actividad"
                                name = "nombre"
                                autoComplete = ""
                                onChange = { this.handleTextInputChange }
                            />
                            <p>Define un banner o frase para tu actividad:</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "banner"
                                label = "Banner de la Actividad"
                                name = "banner"
                                autoComplete = ""
                                onChange = { this.handleTextInputChange }
                            />
                            <p>Escribe una descripción de tu actividad:</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "descripcion"
                                label = "Descripcion de la Actividad"
                                name = "descripcion"
                                autoComplete = ""
                                multiline
                                rows = "4"
                                rowsMax = "4"
                                onChange = { this.handleTextInputChange }
                            />

                        </div>

                        <div className="container_content">
                            
                            <h1>Crear Actividad</h1>
                            <h3>Paso 2: Lugar, fecha, hora</h3>

                            <p>Define un lugar para tu actividad:</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "lugar"
                                label = "Donde ocurrira esta actividad?"
                                name = "lugar"
                                autoComplete = ""
                                onChange = { this.handleTextInputChange }
                            />
                            <Grid container spacing={3}>
                                <Grid item xs={6}> 
                                    <p>Define la fecha:</p>
                                    < this.StyledTextField
                                        variant = "outlined"
                                        margin = "normal"
                                        type = "date"
                                        id = "fecha"
                                        name = "fecha"
                                        onChange = { this.handleTextInputChange }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <p>Define la hora:</p>
                                    < this.StyledTextField
                                        variant = "outlined"
                                        margin = "normal"
                                        type = "time"
                                        id = "hora"
                                        label = "Hora"
                                        name = "hora"
                                        onChange = { this.handleTextInputChange }
                                    />
                                </Grid>
                            </Grid>
                            <p>Escribe alguna nota adicional si lo deseas:</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "notas"
                                label = "Notas adicionales"
                                name = "notas_adicionales"
                                autoComplete = ""
                                multiline
                                rows = "3"
                                rowsMax = "3"
                                onChange = { this.handleTextInputChange }
                            />
                            < FormControlLabel 
                                control={<Checkbox checked="false" onChange={ this.handleRecChange } name="recurrent" color="primary"/>}
                                label="Este evento se realiza de forma periodica?"
                            />
                        </div>

                        <div className="container_content">

                            <h1>Crear Actividad</h1>
                            <h3>Paso 3: Escoge las categorías</h3>                         

                            <div className="categories_container">
                                <Grid
                                    container
                                    spacing={6}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "center">

                                    <Grid item xs={4}>
                                        <div className="categories" id="1" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked1 ? "categories_overlay_selected" : "categories_overlay"}>
                                                <h6 className="categories_txt">ACADEMICO</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="categories" id="2" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked2 ? "categories_overlay_selected" : "categories_overlay"}>
                                                <h6 className="categories_txt">DEPORTE</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="categories" id="3" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked3 ? "categories_overlay_selected" : "categories_overlay"}>
                                                <h6 className="categories_txt">JUEGOS</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="categories_container_2">
                                <Grid
                                    container
                                    spacing={6}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "center">

                                    <Grid item xs={2}>
                                        <div className="categories" id="4" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked4 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="categories_txt">CULTURAL</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className="categories" id="5" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked5 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="categories_txt">COMIDAS</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                   <Grid item xs={2}>
                                        <div className="categories" id="6" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked6 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="categories_txt">FIESTA</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className="categories" id="7" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked7 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="categories_txt">OTROS</h6>
                                            </div>
                                            <img></img>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                                                
                        <div className="container_content">
                            
                            <h1>Crear Actividad</h1>
                            <h3>Paso 4: Elige los tags</h3>
                            <p className="p_fullwidth">Define los tags o palabras clave que se relacionen con la Actividad.</p>
                            
                            <div className="tags_container">
                            {/* <TagInput
                                    tags={this.state.tags}
                                    onTagsChanged={this.onTagsChanged}
                                    wrapperStyle = {`
                                        background: transparent;
                                        box-shadow: none;
                                        padding: 0px 10px 18.5px 14px;
                                        color: rgba(255, 255, 255, 0.75);
                                    `}
                                    inputStyle = { `
                                        background: transparent;
                                        &::-webkit-input-placeholder {
                                            font-size: 0.9em !important;
                                            font-style: normal !important;
                                            font-weight: 200 !important;
                                            color: rgba(255, 255, 255, 0.75);
                                            margin: 0;
                                        }
                                        &: hover {
                                            border: solid 1 px white;
                                        } &
                                        : focus {
                                            border: solid 2 px white;
                                        }
                                    `}
                                    tagStyle={`
                                        font-family: 'Product Sans' !important;
                                        background: white;
                                        color: #08979D;
                                        font-weight: normal;
                                        font-size: 0.97em;
                                        border-radius: 25px;
                                        white-space: nowrap;
                                        margin: 3px 0px;
                                        transition: all .2s;
                                        padding: 8px 12px 8px 16px !important;
                                        margin-right: 8px;
                                        cursor: normal;
                                    `}
                                    tagDeleteStyle={`
                                        font-family: 'Consolas' !important;
                                        font-size: 16px;
                                        color: rgba(0, 0, 0, 0.45);
                                        font-weight: bold;
                                        padding-bottom: 6px !important;
                                        text-decoration: none;
                                        vertical-align: top !important;
                                        line-height: 1.1;
                                    `}
                                /> */}
                            </div>
                            
                            <div>
                                <div className="submit_button" onClick={this.handleSubmit}>
                                    <p>Finalizar</p>
                                </div>
                            </div>

                        </div>
                    </ReactSwipe>
                </div>
                <div className="footer">
                    <Dots className="dots_indicator" length={4} active={this.state.step} visible={4} margin={5} size={12}/>
                </div>
            </div>
        );
    }
}
export default CreateActivity;
