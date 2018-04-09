import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withStyles } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from 'lodash';

// import '../styles/form.css';
import '../styles/app.css';

import Nav from './Nav';
import Drawer from './Drawer';
import PropertyMap from './PropertyMap';
import AddProperty from './AddProperty';
import Landing from './Landing';

const defaultTheme = createMuiTheme();
const purpleTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});
const fontTheme = createMuiTheme({
  palette: {
    secondary: purple,
    primary: green,
  },
  typography: {
    fontFamily: ['Courier', 'Helvetica'],
  }
});
const themes = [defaultTheme, purpleTheme, fontTheme];
const drawerWidth = 316;

const styles = theme => ({
  narrowContainer: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    })
  }
})


class App extends Component {
  state = {
    currentPage: "LAND",
    title: "",
    bedrooms: "",
    rent: "",
    address: "",
    coordinates: [],
    coordsLoaded: false,
    drawer: false,
    theme: purpleTheme,
  }

  toggleDrawer = () => {this.setState( {...this.state, drawer: !this.state.drawer } ) }
  setTheme = (idx) => {this.setState( {...this.state, theme: themes[idx] } ) }

  handleDecidePage = (currentPage) => {
    this.setState({ currentPage });
  };

  handleInputChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmitProperty = async e => {
    e.preventDefault();

    // destructure the address and geocode to get coords
    const { address } = this.state;
    await this.getPropertyCoords(address);

    // TODO ---- Pictures uploading to S3
    
    const { title, bedrooms, rent, coordinates, coordsLoaded } = this.state;   
    
    // check if state was set with the returned coords before sending to DB
    if(!coordsLoaded) return;
    
    const response = await axios.post('/api/property/add', { title, bedrooms, rent, address, coordinates });

    // if db entry was success then clear the form and redirect to the MAP page
    if (response.status === 200) {
      this.setState({ 
        title: "",
        bedrooms: "",
        rent: "",
        address: "",
        coordinates: [],
       })
      this.handleDecidePage("MAP");
    }
  }

  getPropertyCoords = async address => {

    try {
      const results = await geocodeByAddress(address);

      const latLng = await getLatLng(results[0]);
      if (_.isEmpty(latLng)) return;
      this.setState({
        coordinates: [latLng.lat, latLng.lng],
        coordsLoaded: true
      })
    } catch(err) {
      console.log(err)
    }
  }

  render () {
    const { currentPage, title, bedrooms, rent, address, drawer } = this.state;
    const { classes } = this.props;
    return (

      <MuiThemeProvider theme={this.state.theme}>

        <Drawer 
          open={this.state.drawer}
          toggleDrawer={this.toggleDrawer}
          handleDecidePage={this.handleDecidePage}
        />

        <div className={drawer ? classes.narrowContainer : null}>
          <Nav 
            open={drawer}
            toggleDrawer={this.toggleDrawer}
            handleDecidePage={this.handleDecidePage}
          />
        { currentPage === 'LAND' && <Landing /> }
        
        </div>


        { 
           currentPage === 'ADD' && <AddProperty
                                      title={title}
                                      bedrooms={bedrooms}
                                      rent={rent}
                                      address={address}
                                      handleInputChange={this.handleInputChange}
                                      handleSubmitProperty={this.handleSubmitProperty}
                                      handleDecidePage={this.handleDecidePage}
                                    />
        }

        { currentPage === 'MAP' && <PropertyMap /> }

      </MuiThemeProvider>

    )
  }
}

export default withStyles(styles)(App);