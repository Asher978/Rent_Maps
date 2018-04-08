import React, { Component } from 'react';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class PropertyMap extends Component {
  state = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 14,
    posReceived: true,
    properties: null,
  }

  async componentDidMount () {
    
    this.getPosition();

    const getProperties = await axios.get('/api/property');
    
    if (getProperties.status === 200) {
      this.setState({ properties: getProperties.data })
    };
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
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup>
              { this.renderPropertyMarkers() }
            </MarkerClusterGroup>

        </Map>
    )
}
  render () {
    const { posReceived } = this.state;
    return (
      <div>
        <h1>Maps</h1>
        { posReceived && this.renderMap() }
      </div>
    )
  }
}

export default PropertyMap;