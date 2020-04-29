import React, { Component } from 'react'
import axios from 'axios'
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

const { API_KEY } = process.env
const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'

class Search extends Component {
  
constructor(props){
    super(props)
    this.state = {
        query: '',
        results: []
    }
}

  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
      .then(({ data }) => {
        this.setState({
          results: data.data // MusicGraph returns an object named data, 
                             // as does axios. So... data.data                             
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }

  render() {
    return (
        <div className="container_search_bar">
            <div className="search_bar">
                <form>
                    <input
                    label="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    />
                </form>
            </div>
            <p>{this.state.query}</p>
        </div>
        
      
    )
  }
}

export default Search