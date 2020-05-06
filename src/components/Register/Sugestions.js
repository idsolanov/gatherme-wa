import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MdAdd from '@material-ui/icons/Add';
import { withStyles, makeStyles } from '@material-ui/core/styles';



const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    borderRadius: '10px',
    fontSize: 13,
  },
}))(Tooltip);

class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      categories: [
        { name: "Academico" },
        { name: "Deporte" },
        { name: "Juegos" },
        { name: "Cultural" },
        { name: "Comidas" },
        { name: "Fiesta" },
        { name: "Otros" }
      ],
      category: "",
      like: ""
    }
    this.primaryColor = '#40989d';
    this.setOpen = this.setOpen.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.sendData = this.sendData.bind(this);

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
  }
  sendData = (childData) => {
    console.log(childData);
    this.props.parentCallback(childData);
  }
  setOpen = (status) => {
    this.setState({
      open: status
    })

  }
  handleClickOpen() {
    this.setOpen(true);
  };

  handleClose() {
    this.setOpen(false);
  };
  handleChangeCategory(value) {
    this.setState({
      category: value
    })
    console.log(value);

  }
  handleGenderChange(event) {
    this.setState({
      category: event.target.value
    })
    console.log(event.target.value);
    console.log(this.state.category)
  }

  render() {

    console.log(this.state.open)

    return (
      <div>
        <StyledTooltip title="Crear Gusto" placement="left">
          <Fab style={{ backgroundColor: '#40989d' }} aria-label="add" onClick={this.handleClickOpen} >
            <MdAdd style={{ fontSize: 25, color: 'white' }} />
          </Fab>

        </StyledTooltip>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Agregar nuevo gusto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seleccione la categoria e ingrese el gusto
          </DialogContentText>

            <this.StyledAutocomplete
              id="combo-box-demo"
              options={this.state.categories}
              onChange={(event, value) => this.handleChangeCategory(value)}
              getOptionLabel={(option) => option.name}
              style={{ width: 300, color: '#40989d' }}
              renderInput={(params) => <TextField {...params} label="Categoria" variant="outlined" />}
            />
            <this.StyledTextField
              autoFocus
              margin="dense"
              id="gusto"
              label="Agrege el nuevo gusto"
              fullWidth
              onChange={(event) => {
                console.log(String(event.target.id))
                console.log(String(event.target.value))
                this.setState({
                  like: event.target.value
                })
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
          </Button>
            <Button onClick={() => {
              this.sendData([this.state.category.name, this.state.like])
              this.handleClose()
            }
            } color="primary">
              Agregar
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;