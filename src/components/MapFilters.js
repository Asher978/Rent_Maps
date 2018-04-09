import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});





class MapFilters extends Component {
  state = {
    bedroom: 0,
    rent: 0,
  }

  bedroomsList = num => {
    let list = [];
    for (let i=0; i<num; i++) {
      list.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return list;
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }
  
  render () {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          id="kind"
          label="Kind of Property"
          className={classes.textField}
          value={this.state.kind}
          margin="normal"
        />

        <TextField
          id="rent"
          label="Rent"
          value={this.state.rent}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          id="select-bedrooms"
          select
          label="Select"
          className={classes.textField}
          value={this.state.bedroom}
          onChange={this.handleChange('bedroom')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Filter your search by bedroom"
          margin="normal"
        >
          { this.bedroomsList(5) }
        </TextField>

      </form>
    )
  }
}

export default withStyles(styles)(MapFilters);