import React, { Component } from "react";
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import Dots from 'react-carousel-dots';
import TagsInput from 'react-tagsinput';

import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';

import SchoolIcon from '@material-ui/icons/School';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SportsFootballOutlinedIcon from '@material-ui/icons/SportsFootballOutlined';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SportsEsportsOutlinedIcon from '@material-ui/icons/SportsEsportsOutlined';
import TheatersIcon from '@material-ui/icons/Theaters';
import TheatersOutlinedIcon from '@material-ui/icons/TheatersOutlined';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import DeckIcon from '@material-ui/icons/Deck';
import DeckOutlinedIcon from '@material-ui/icons/DeckOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';

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
                color:'white',  
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
        this.setState({
            [event.currentTarget.name]: !this.state[event.currentTarget.name]
        });
    }

    onTagsChanged(tags) {
        this.setState({ tags: this.state.tags.concat(tags) })
    }

    onTagsDeleted(tag) {
        this.setState({ tags: tag })
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
            url: "http://127.0.0.1:9001/graphql",
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
        }, (error) => {
            console.log(error);
        });

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

                            <h3>Paso 3: Escoge las categorías</h3>                         

                            <FormControl component="fieldset" className="categories_container" fullWidth>
                                <FormGroup row>
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="1"
                                        control={<Checkbox 
                                                checked={this.state.checked1} onChange={this.handleCategorySelected} name="checked1"
                                                icon={<SchoolOutlinedIcon />} checkedIcon={<SchoolIcon />} />}
                                        label="Académico"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="2"
                                        control={<Checkbox 
                                                checked={this.state.checked2} onChange={this.handleCategorySelected} name="checked2"
                                                icon={<SportsFootballOutlinedIcon />} checkedIcon={<SportsFootballIcon />} />}
                                        label="Deporte"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="3"
                                        control={<Checkbox 
                                                checked={this.state.checked3} onChange={this.handleCategorySelected} name="checked3"
                                                icon={<SportsEsportsOutlinedIcon />} checkedIcon={<SportsEsportsIcon />} />}
                                        label="Juegos"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="4"
                                        control={<Checkbox 
                                                checked={this.state.checked4} onChange={this.handleCategorySelected}  name="checked4"
                                                icon={<TheatersOutlinedIcon />} checkedIcon={<TheatersIcon />} />}
                                        label="Cultural"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="5"
                                        control={<Checkbox 
                                                checked={this.state.checked5} onChange={this.handleCategorySelected} name="checked5"
                                                icon={<FastfoodOutlinedIcon />} checkedIcon={<FastfoodIcon />}/>}
                                        label="Comidas"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="6"
                                        control={<Checkbox 
                                                checked={this.state.checked6} onChange={this.handleCategorySelected}  name="checked6"
                                                icon={<DeckOutlinedIcon />} checkedIcon={<DeckIcon />} />}
                                        label="Fiesta"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <FormControlLabel
                                        value="7"
                                        control={<Checkbox 
                                            checked={this.state.checked7} onChange={this.handleCategorySelected}  name="checked7"
                                            icon={<ListAltOutlinedIcon />} checkedIcon={<ListAltIcon />} />}
                                        label="Otros"
                                        labelPlacement="bottom"
                                    />
                                    <Divider orientation="vertical" flexItem />
                                </FormGroup>
                            </FormControl>

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
