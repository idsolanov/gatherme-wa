import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { withStyles, createMuiTheme } from '@material-ui/core/styles';



class Search extends Component {
  
constructor(props){
    super(props)
    this.state = {
        query: '',
        results: [],
        tags: []
    }
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleTagsDelete = this.handleTagsDelete.bind(this);

    this.StyledTextField = withStyles({
      root: {
          width: '100%',
          fontFamily: 'Product Sans',
      },
      span: {
        backgroundColor: 'rgba(0, 0, 0, 0.3);'
      }
  })(TagsInput);
}

handleTagsChange(tags) {
  
  this.setState({
    tags: this.state.tags.concat(tags)
  })
}
handleTagsDelete(tag) {
  /*console.log("tags",tag)
  let index = this.state.tags.indexOf(tag);
  console.log("arreglo",this.state.tags)
  console.log("index",index)
  let array = this.state.tags.splice(index, 1);
  console.log(array)*/
  this.setState({
    tags: tag
  })
}
  render() {
    return (
      <Grid
            container
            direction="column"
            justify="center"
            alignContent="stretch"
            spacing={2}
          > 
            <Grid item xs={12}
                >
                <div className="container_search_bar_register">
                  <div className="search_bar_register">
                  <Grid itme ={12}>
                    <TagsInput
                     value={[]} onChange={this.handleTagsChange}                     
                    />
                  </Grid>
                  </div>
                </div>
            </Grid>

            <Grid item xs={12}
                >
                <div className="sugestions">
                  <TagsInput
                  value={this.state.tags}
                  onChange={this.handleTagsDelete}>

                  </TagsInput>
                </div>
            </Grid>
              
          </Grid>
        
        
      
    )
  }
}

export default Search