import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SchoolIcon from '@material-ui/icons/School';
import TheatersIcon from '@material-ui/icons/Theaters';
import DeckIcon from '@material-ui/icons/Deck';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';


import './ActivityCard.css'
import { Grid } from '@material-ui/core';


const StyledTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        borderRadius: '10px',
        fontSize: 13,
    },
}))(Tooltip);


class ActivityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: {},
            open: false,
            categoriesList: [],
            likeList: [],
            memeberList: [],
            noteList: [],
            commentsList: [],
            username: this.props.user,
            token: this.props.token,
            suscrito: false,
            comment: "",
            send: false
        }
        this.setOpen = this.setOpen.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.renderLikes = this.renderLikes.bind(this);
        this.renderMembers = this.renderMembers.bind(this);
        this.renderNotas = this.renderNotas.bind(this);
        this.rendercomments = this.rendercomments.bind(this);
        this.suscribirse = this.suscribirse.bind(this);
        this.addComment = this.addComment.bind(this);
        this.gradient = 'linear-gradient(136deg, #055B5C 0%, #40989d 50%)';
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
    renderCategories() {
        var arr = []
        if (this.state.activity.categoria.indexOf("Academico") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Academico" >
                    <SchoolIcon style={{ fontSize: 25 }} nativeColor="white" />
                </Fab>)
        }
        if (this.state.activity.categoria.indexOf("Deporte") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Deporte" >
                    <SportsFootballIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>
            )
        }
        if (this.state.activity.categoria.indexOf("Juegos") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Juegos" >
                    <SportsEsportsIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>)
        }
        if (this.state.activity.categoria.indexOf("Cultural") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Cultural" >
                    <TheatersIcon style={{ fontSize: 25 }} nativeColor="black"/>
                </Fab>
            )
        }
        if (this.state.activity.categoria.indexOf("Comidas") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Comidas" >
                    <FastfoodIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>)
        }
        if (this.state.activity.categoria.indexOf("Fiesta") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Fiesta" >
                    <DeckIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>)
        }
        if (this.state.activity.categoria.indexOf("Otros") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Otros" >
                    <ListAltIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>)
        }
        this.setState({
            categoriesList: arr
        })
    }
    renderLikes() {
        let arre = []
        this.state.activity.tags_especificos.forEach(element => {
            arre.push(
                <span className="like-tag">
                    {element}
                </span>
            )
        });
        this.setState({
            likeList: arre
        })
    }

    rendercomments() {
        let arr = []
        this.state.activity.comments.forEach(element => {
            arr.push(
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>

                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={element.userId}
                        secondary={
                            element.content
                        }
                    />
                </ListItem>
            )
            arr.push(
                <Divider />
            )
        })
        this.setState({
            commentsList: arr
        })

    }

    renderNotas() {
        let arr = []
        this.state.activity.notas_adicionales.forEach(element => {
            arr.push(
                <ListItem>
                    <ListItemText
                        primary={element}
                    />
                </ListItem>
            )
        })
        this.setState({
            noteList: arr
        })
    }

    suscribirse() {
        console.log("entro")
        let kk = `
        mutation{
            addMember(id:${this.state.activity.id},user:"${this.state.username}",token: "${this.state.token}"){
              id
            }
          }
  `;

        console.log(kk)
        axios({
            url: "http://localhost:9001/graphql",
            method: 'POST',
            data: {
                query: `
        mutation{
            addMember(id:${this.state.activity.id},user:"${this.state.username}",token: "${this.state.token}"){
              id
            }
          }
      `
            }
        }).then((result) => {
            console.log(result.data)
            this.setState({
                suscrito: true
            })
        });

    }

    addComment() {
        console.log(this.state.comment);

        let kk = `
        mutation{
            commentActivity(id:${this.state.activity.id},comment: {
              userId:  "${this.state.username}" 
              content:  "${this.state.comment}"
              date:  "07/05/2020"
            }) {
              Status
            }
          }
        `;

        axios({
            url: "http://localhost:9001/graphql",
            method: 'POST',
            data: {
                query: `
                mutation{
                    commentActivity(id:${this.state.activity.id},comment: {
                      userId:  "${this.state.username}" 
                      content:  "${this.state.comment}"
                      date:  "07/05/2020"
                    }) {
                      Status
                    }
                  }
      `
            }
        }).then((result) => {
            console.log(result.data)
            this.setState({
                send: true
            })
        });
        this.setState({
            comment: ""
        })

    }


    renderMembers() {
        let arr = []
        this.state.activity.lista_miembros.forEach(element => {
            arr.push(
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>

                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={element} />
                </ListItem>
            )
        })

        this.setState({
            memeberList: arr
        })

    }
    componentDidMount() {
        console.log(this.props.activityData["id"])
        axios({
            url: "http://localhost:9001/graphql",
            method: 'POST',
            data: {
                query: `
                query{
                    getActivityByID(id:${this.props.activityData["id"]}){
                        id
                        informacion
                        nombre
                        descripcion
                        lista_miembros
                        tags_especificos
                        notas_adicionales
                        categoria
                        recurrente
                        lugar
                        hora
                        fecha
                        banner
                        administrador
                      comments {
                       userId
                        id
                        content
                        date
                    }
                }
            }
      `
            }
        }).then((result) => {
            console.log(result.data.data.getActivityByID)
            this.setState({
                activity: result.data.data.getActivityByID
            })
            this.renderCategories();
            this.renderLikes();
            this.renderMembers();
            this.renderNotas();
            this.rendercomments();
        });
    }

    componentDidUpdate() {
        if (this.state.suscrito) {
            this.setState({
                suscrito: false
            })
            this.componentDidMount()
        }
        if (this.state.send) {
            this.setState({
                send: false
            })
            this.componentDidMount()
        }
    }

    setOpen = (status) => {
        this.setState({
            open: status
        })

    }
    handleClickOpen() {

        this.setOpen(true);
        console.log(this.state.commentsList)
    };

    handleClose() {
        this.setOpen(false);
    };

    render() {
        console.log(this.state.activity)
        return (

            <div className="activity_card_container">
                <div className="activity_card">
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="100"
                                image={this.state.activity.banner}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.activity.nombre}
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    <AccessTimeIcon /> {this.state.activity.hora}  <CalendarTodayIcon /> {this.state.activity.fecha} <SupervisorAccountIcon /> {this.state.activity.administrador}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={this.handleClickOpen}>
                                Ver mas
        </Button>
                        </CardActions>
                    </Card>
                </div>


                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <div className="dialog_activities">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="100"
                                    image={this.state.activity.banner}
                                    title="Contemplative Reptile"
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <div className="card-like-content">
                                    <h1>{this.state.activity.nombre}</h1>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <h2>Lugar: {this.state.activity.lugar}</h2>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <h2>Fecha y hora: {this.state.activity.fecha}/{this.state.activity.hora}</h2>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="card-like-content">
                                    <div className="like-card-center-container">
                                        <div className="like-card-content-activity">
                                            <h3>{this.state.activity.descripcion}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <div className="card-content-activity-border">

                                        <Typography variant="h6" >
                                            Categorias
          </Typography>
                                        {this.state.categoriesList}
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <div className="card-content-activity-border">
                                        <Typography variant="h6" >
                                            Gustos asociados
          </Typography>
                                        {this.state.likeList}
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    {//<h3></h3>////
                                    }
                                    <Typography variant="h6" >
                                        Notas adicionales
          </Typography>
                                    <div className="list-item-container">
                                        <List>
                                            {this.state.noteList}
                                        </List>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <Typography variant="h6" >
                                        Lista de miembros
          </Typography>
                                    <div className="list-item-container">
                                        <List >
                                            {this.state.memeberList}
                                        </List>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={9}>

                            </Grid>
                            <Grid item xs={3}>
                                <this.StyledButtonFinish button onClick={() => {
                                    this.suscribirse()
                                }}
                                    fullWidth
                                    focusRipple
                                    variant="contained"
                                    size="medium"
                                    text="bold"
                                >
                                    Suscribete
                                </this.StyledButtonFinish>
                            </Grid>

                            <Grid item xs={12}>
                                <div className="card-like-content">
                                    <Typography variant="h5" >
                                        Comentarios
          </Typography>
                                    <List>
                                        {this.state.commentsList}
                                    </List>

                                </div>
                            </Grid>

                            <Grid item xs={10}>
                                <div className="card-like-content">
                                    < this.StyledTextField
                                        variant="outlined"
                                        margin="normal"
                                        value={this.state.comment}
                                        fullWidth
                                        id="comment"
                                        label="Escribe un comentario"
                                        name="comment"
                                        onChange={(event) => {
                                            this.setState({
                                                comment: event.target.value
                                            })
                                        }
                                        }
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="card-like-content">
                                    <this.StyledButtonFinish button onClick={() => {
                                        this.addComment()
                                    }}
                                        fullWidth
                                        focusRipple
                                        variant="contained"
                                        size="medium"
                                        text="bold"
                                    >
                                        Comentar
                                </this.StyledButtonFinish>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                </Dialog>

            </div>

        )
    }
};

export default ActivityCard;