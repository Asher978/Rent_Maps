import React, { Component } from 'react';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import _ from 'lodash';

import '../styles/form.css';
import '../styles/app.css';

import Nav from './Nav';
import PropertyMap from './PropertyMap';
import AddProperty from './AddProperty';


class App extends Component {
  state = {
    currentPage: "",
    title: "",
    bedrooms: "",
    rent: "",
    address: "",
    coordinates: [],
    coordsLoaded: false,
  }

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

    // deconstruct the address and geocode to get coords
    const { address } = this.state;
    await this.getPropertyCoords(address);

    // TODO ---- Pictures uploading to S3
    
    const { title, bedrooms, rent, coordinates, coordsLoaded } = this.state;   
    
    // check if state was set with the returned coords before sending to DB
    if(!coordsLoaded) return;
    
    const response = await axios.post('/api/property/add', { title, bedrooms, rent, address, coordinates })
    console.log("after adding a property", response)

    // TODO -- Redirect here to the Map page
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
    const { currentPage, title, bedrooms, rent, address } = this.state;
    return (
      <div>

        <Nav />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-md-offset-3">
              <button className="btn" onClick={() => this.handleDecidePage('MAP')}>
                View Properties on the Map
              </button>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <button className="btn" onClick={() => this.handleDecidePage('ADD')}>
                Add a Property
              </button>
            </div>
          </div>
        </div>

        { 
          currentPage === 'ADD' && <AddProperty
                                     title={title}
                                     bedrooms={bedrooms}
                                     rent={rent}
                                     address={address}
                                     handleInputChange={this.handleInputChange}
                                     handleSubmitProperty={this.handleSubmitProperty}
                                   /> 
        }

        { currentPage === 'MAP' && <PropertyMap /> }

      </div>
    )
  }
}

export default App;