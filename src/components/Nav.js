import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddCircle from 'material-ui-icons/AddCircle';
import ZoomOutMap from 'material-ui-icons/ZoomOutMap';
import Home from 'material-ui-icons/Home';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit *3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navBar: {
    background: '#24C6DC',
    background: '-webkit-linear-gradient(to top, #514A9D, #24C6DC)',
    background: 'linear-gradient(to top, #514A9D, #24C6DC)',
  }
});

class Nav extends Component {

  render () {
    const { classes, handleDecidePage } = this.props;
    return (
      <AppBar position="static" elevation={0} className={classes.navBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="default" onClick={this.props.toggleDrawer}><MenuIcon/></IconButton>
          <Typography className={classes.flex} type="title" color="inherit">
            Rent Maps
          </Typography>
          <div>
            <IconButton color="default" onClick={() => handleDecidePage("LAND")}>
              <Home />
            </IconButton>
            <IconButton color="default" onClick={() => handleDecidePage("ADD")}>
              <AddCircle />
            </IconButton>
            <IconButton color="default" onClick={() => handleDecidePage("MAP")}>
              <ZoomOutMap />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Nav);