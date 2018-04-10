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

  bedroomsList = num => {
    let list = [];
    for (let i=1; i<num; i++) {
      list.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
    }
    return list;
  }
  
  render () {
    const { classes, filter, handleFilterChange, handleFilterBedrooms } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          id="Title"
          label="Title of Property"
          className={classes.textField}
          value={filter.title || ''}
          onChange={handleFilterChange('title')}
          margin="normal"
        />

        <TextField
          id="rent"
          label="Rent"
          value={filter.rent || ''}
          className={classes.textField}
          onChange={handleFilterChange('rent')}
          margin="normal"
        />

        <TextField
          id="select-bedrooms"
          select
          label="Select"
          className={classes.textField}
          value={filter.bedrooms || ''}
          onChange={handleFilterChange('bedrooms')}
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