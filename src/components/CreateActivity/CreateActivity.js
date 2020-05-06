import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import Dots from 'react-carousel-dots';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TagsInput from 'react-tagsinput'
import Fab from '@material-ui/core/Fab';
import MdAdd from '@material-ui/icons/Add';
import MdClose from '@material-ui/icons/Clear';
import SchoolIcon from '@material-ui/icons/School';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TheatersIcon from '@material-ui/icons/Theaters';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DeckIcon from '@material-ui/icons/Deck';

import axios from 'axios';

import './CreateActivity.css';

const StyledTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        borderRadius: '10px',
        fontSize: 13,
    },
}))(Tooltip);

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
            categories: ["Academico", "Deporte", "Juegos", "Cultural", "Comidas", "Fiesta", "Otros"],
            selectedCategories: [],
            tags: []
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.onTagsChanged = this.onTagsChanged.bind(this);
        this.onTagsDeleted = this.onTagsDeleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRecChange = this.handleRecChange.bind(this);
        let assistantSwipe;

        this.StyledTextField = withStyles({
            root: {
                width: '70% !important',
                marginTop: '18px',
                color: 'white',
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

    handleNext() {
        this.assistantSwipe.next();
        if (this.state.step != 3) {
            this.setState({
                step: this.state.step + 1
            });
        }

        if (this.state.step == 2) {

            if (this.state.checked1) { this.state.selectedCategories.push(this.state.categories[0]); }
            if (this.state.checked2) { this.state.selectedCategories.push(this.state.categories[1]); }
            if (this.state.checked3) { this.state.selectedCategories.push(this.state.categories[2]); }
            if (this.state.checked4) { this.state.selectedCategories.push(this.state.categories[3]); }
            if (this.state.checked5) { this.state.selectedCategories.push(this.state.categories[4]); }
            if (this.state.checked6) { this.state.selectedCategories.push(this.state.categories[5]); }
            if (this.state.checked7) { this.state.selectedCategories.push(this.state.categories[6]); }
        }
    }

    handleBack() {
        this.assistantSwipe.prev();
        if (this.state.step != 0) {
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
        this.setState({ tags: this.state.tags.concat(tags) })
    }

    onTagsDeleted(tag) {
        this.setState({ tags: tag })
    }

    handleSubmit(event) {



        var catnames = ['Academico', 'Deporte', 'Juegos', 'Cultural', 'Comidas', 'Fiesta', 'Otros'];

        let strCategories = "[";
        for (let i = 1; i <= 7; i++) {
            let prop = "checked" + i;

            if (this.state[prop]) {
                if (i == 7) {
                    strCategories += '"' + catnames[i - 1] + '"'

                }
                else {
                    strCategories += '"' + catnames[i - 1] + '",'

                }
            }
        }
        strCategories += "]";

        console.log(strCategories);







        // axios.post({
        //     url: "http://127.0.0.1:9001/graphql",
        //     method: 'post',
        //     data: {
        //         query: `
        //             mutation{
        //                 createActivity(
        //                     activity:{
        //                         informacion:""
        //                         nombre: "${this.state.nombre}"
        //                         descripcion:"${this.state.descripcion}"
        //                         lista_miembros: ["${this.state.userData.username}"]
        //                         tags_especificos: ${strTags}
        //                         notas_adicionales: ${this.state.notas}
        //                         categoria: ${strCategories}
        //                         recurrente: ${this.state.recurrent.toString()}
        //                         lugar: "${this.state.lugar}"
        //                         hora: "${this.state.hora}"
        //                         fecha:"${this.state.fecha}"
        //                         banner: "${this.state.banner}"
        //                         administrador: "${this.state.userData.username}"
        //                         }, 
        //                     token:
        //                         ${this.state.token}
        //                     }){
        //                 id
        //                 }
        //             }
        //         `
        //     }

        // }).then((response) => {
        //     console.log(response.data);
        // }, (error) => {
        //     console.log(error);
        // });

        //Esto cierra el popup
        this.props.parentCallback([true]);
    }


    render() {


        return (
            <div className="activity_basic_container">
                <div className="container">

                    <IconContext.Provider value={{ size: "2.5em ", className: 'left_arrow' }}>
                        <FaAngleLeft onClick={this.handleBack} />
                    </IconContext.Provider>

                    <IconContext.Provider value={{ size: "2.5em ", className: 'right_arrow' }}>
                        <FaAngleRight onClick={this.handleNext} />
                    </IconContext.Provider>

                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (this.assistantSwipe = el)}>

                        <div className="container_content">

                            <h3>Paso 1: Información básica</h3>

                            <p>Define un nombre para tu actividad:</p>
                            < this.StyledTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="nombre"
                                label="Nombre de la actividad"
                                name="nombre"
                                autoComplete=""
                                onChange={this.handleTextInputChange}
                            />
                            <p>Define un banner o frase para tu actividad:</p>
                            < this.StyledTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="banner"
                                label="Banner de la Actividad"
                                name="banner"
                                autoComplete=""
                                onChange={this.handleTextInputChange}
                            />
                            <p>Escribe una descripción de tu actividad:</p>
                            < this.StyledTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="descripcion"
                                label="Descripcion de la Actividad"
                                name="descripcion"
                                autoComplete=""
                                multiline
                                rows="4"
                                rowsMax="4"
                                onChange={this.handleTextInputChange}
                            />

                        </div>

                        <div className="container_content">
                            <div className="container_fecha">




                                <h3>Paso 2: Lugar, fecha, hora</h3>


                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignContent="center"
                                    spacing={2}
                                >
                                    <Grid item >
                                        <div className="activity_place">

                                            <p>Define un lugar para tu actividad:</p>
                                            < this.StyledTextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="lugar"
                                                label="Donde ocurrira esta actividad?"
                                                name="lugar"
                                                autoComplete=""
                                                onChange={this.handleTextInputChange}
                                            />
                                        </div>


                                    </Grid>
                                    <Grid item className="date_time_grid" >

                                        <div className="date_time_container">

                                            <div className="date_container">
                                                <p>Define la fecha:</p>
                                                < this.StyledTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="date"
                                                    id="fecha"
                                                    name="fecha"
                                                    onChange={this.handleTextInputChange}
                                                />
                                            </div>

                                            <div className="time_container">

                                                <p>Define la hora:</p>
                                                < this.StyledTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="time"
                                                    id="hora"
                                                    name="hora"
                                                    onChange={this.handleTextInputChange}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div className="activity_note">
                                            <p>Escribe alguna nota adicional si lo deseas:</p>
                                            < this.StyledTextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="notas"
                                                label="Notas adicionales"
                                                name="notas_adicionales"
                                                autoComplete=""
                                                multiline
                                                rows="3"
                                                rowsMax="3"
                                                onChange={this.handleTextInputChange}
                                            />
                                            < FormControlLabel
                                                control={<Checkbox checked={this.state.recurrent} onChange={this.handleRecChange} name="recurrent" color="primary" />}
                                                label="Este evento se realiza de forma periódica?"
                                            />
                                        </div>

                                    </Grid>
                                </Grid>
                            </div>

                        </div>

                        <div className="container_content">
                            <div className="categories_container">
                                <h3>Paso 3: Escoge las categorías</h3>
                                <div className="categories_1">
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="1" onClick={this.handleCategorySelected}
                                            style={this.state.checked1 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }} >
                                            <SchoolIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="2" onClick={this.handleCategorySelected}
                                            style={this.state.checked2 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <SportsFootballIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="3" onClick={this.handleCategorySelected}
                                            style={this.state.checked3 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <SportsEsportsIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="4" onClick={this.handleCategorySelected}
                                            style={this.state.checked4 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <TheatersIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>

                                </div>
                                <div className="categories_2">
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="5" onClick={this.handleCategorySelected}
                                            style={this.state.checked5 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <FastfoodIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="6" onClick={this.handleCategorySelected}
                                            style={this.state.checked6 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <DeckIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>
                                    <StyledTooltip title="Crear Actividad" placement="left" >
                                        <Fab color="primary" aria-label="add" id="7" onClick={this.handleCategorySelected}
                                            style={this.state.checked7 ? { backgroundColor: 'white', color: '#8474a1' } : { backgroundColor: '#8474a1', color: 'white' }}>
                                            <ListAltIcon style={{ fontSize: 25 }} />
                                        </Fab>
                                    </StyledTooltip>

                                </div>


                            </div>
                        </div>

                        <div className="container_content">

                            <h3>Paso 4: Elige los tags</h3>
                            <p className="p_fullwidth">Define los tags o palabras clave que se relacionen con la Actividad. Escribe en el primer recuadro los tags que quieras, y aparecerán en el segundo. Puedes eliminar un tag haciendo clic en la x.</p>

                            <div className="tags_container">
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignContent="stretch"
                                    spacing={2}
                                >
                                    <Grid item xs={12}>
                                        <div className="tags_search_bar_container">
                                            <Grid item xs={12}>
                                                <div className="tags_search_bar">
                                                    <TagsInput
                                                        value={[]} onChange={this.onTagsChanged}
                                                    />
                                                </div>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className="tags_list">
                                            <TagsInput
                                                value={this.state.tags} onChange={this.onTagsDeleted}
                                            />
                                        </div>
                                    </Grid>

                                </Grid>
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
                    <Dots className="dots_indicator" length={4} active={this.state.step} visible={5} margin={5} size={12} />
                </div>
            </div>
        );
    }
}
export default CreateActivity;