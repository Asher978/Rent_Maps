import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import MapFilters from './MapFilters';

const styles = theme => ({
  mapContainer: {
    display: 'flex',
  },
})

class PropertyMap extends Component {
  state = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 14,
    posReceived: true,
    properties: null,
    bedroom: 0,
    rent: 0,
    title: ''
  }

  async componentDidMount () {
    
    this.getPosition();

    const getProperties = await axios.get('/api/property');
    
    if (getProperties.status === 200) {
      this.setState({ properties: getProperties.data })
    };
  }

  handleFilterChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleFilterBedrooms = e => {
    const { properties } = this.state;
    if (properties) {
      console.log("filtered data", properties, e.target.value)
      let filtered = properties.filter(prop => prop.bedrooms === e.target.value);
      this.setState({ properties: filtered })
    }
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos)
      if(pos.coords) {
        this.setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          posReceived: true,
        })
      } else {
        this.setState({ posReceived: true })
      }
    })
  }

  renderPropertyMarkers = () => {
    const { properties } = this.state;
    if (properties) {
      return properties.map((property, i) => {
        const { title, bedrooms, rent, coordinates } = property;
        return (
          <Marker key={i} position={coordinates}>
            <Tooltip permanent>
              <span>{title}</span>
            </Tooltip>
            <Popup>
              <span>RENT: ${rent}<br/>BEDROOMS: {bedrooms}</span>
            </Popup>
          </Marker>
        )
      })
    }
  }

  

  renderMap () {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
        <Map center={position} zoom={zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://api.mapbox.com/styles/v1/asher978/cjfrj83ad64ti2smv09m6qm0b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2pmcm42dTU3MDVxaTJxczM3dm1ndjUwMiJ9.jqOnJvWmyibbEtrDY3zSCQ"
            />

            <MarkerClusterGroup>
              { this.renderPropertyMarkers() }
            </MarkerClusterGroup>

        </Map>
    )
}
  render () {
    const { posReceived, title, bedroom, rent } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.mapContainer}>

        <MapFilters
          title={title}
          bedroom={bedroom}
          rent={rent}
          handleFilterChange={this.handleFilterChange}
          handleFilterBedrooms={this.handleFilterBedrooms}
        />

        { posReceived && this.renderMap() }
      </div>
    )
  }
}

export default withStyles(styles)(PropertyMap);