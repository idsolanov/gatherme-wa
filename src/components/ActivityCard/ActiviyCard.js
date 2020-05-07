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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import SchoolIcon from '@material-ui/icons/School';
import Fab from '@material-ui/core/Fab';




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
            likeList: []
        }
        this.setOpen = this.setOpen.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.renderLikes = this.renderLikes.bind(this);
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
        if (this.state.activity.categoria.indexOf("Juegos") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Juegos" >
                    <SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black"></SportsHandballIcon>
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
                    <SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black" />
                </Fab>)
        }
        if (this.state.activity.categoria.indexOf("Otros") != -1) {
            arr.push(
                <Fab disabled color="primary" aria-label="Otros" >
                    <SportsHandballIcon style={{ fontSize: 25 }} nativeColor="black" />
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
    componentDidMount() {
        this.setState({
            activity: this.props.activityData
        })

    }

    setOpen = (status) => {
        this.setState({
            open: status
        })

    }
    handleClickOpen() {
        this.renderCategories()
        this.renderLikes()
        this.setOpen(true);
    };

    handleClose() {
        this.setOpen(false);
    };

    /*
    
    <ActivityCard activityData = {testAativity}/>
                                <ActivityCard activityData = {testAativity}/>
    
    type Activity {
    id: Int
    informacion:  String!
    nombre:  String!
    descripcion:  String!
    lista_miembros : [String]
    likes : [String]
    notas_adicionales : [String]
    categoria:  [String]
    reccurrente: Boolean!
    lugar:  String!
    hora:  String!
    fecha:  String!
    banner:  String!
    comments: [Comment]
    administrador:  String!
    }
    
    
    
    
    
    
    */
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
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <div className="card-content-activity-border">
                                        <h3>Categorias</h3>
                                        {this.state.categoriesList}
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={6}>
                                <div className="card-like-content">
                                    <div className="card-content-activity-border">
                                    <h3>Gustos asociados</h3>
                                        {this.state.likeList}
                                    </div>
                                </div>
                            </Grid>



                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={6}>

                            </Grid>

                        </Grid>
                    </div>
                </Dialog>

            </div>

        )
    }
};

export default ActivityCard;