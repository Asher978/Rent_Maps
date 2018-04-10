import React, { Component } from 'react';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

import MapFilters from './MapFilters';

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
  });
};

class PropertyMap extends Component {
  state = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 14,
    posReceived: true,
    properties: null,
    filter: {
      bedrooms: null,
      rent: null,
      title: ''
    }
  }

  async componentDidMount () {
    
    this.getPosition();

    const getProperties = await axios.get('/api/property');
    
    if (getProperties.status === 200) {
      this.setState({ properties: getProperties.data })
    };
  }

  handleFilterChange = name => event => {
    let upDatedFilter = { ...this.state.filter };
    upDatedFilter[name] = parseInt(event.target.value);
    this.setState({ filter: upDatedFilter });
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

  _filter = (property) => {
    const { filter } = this.state;
    return (
      (!filter.bedrooms || (property.bedrooms === filter.bedrooms)) &&
      (!filter.rent || (property.rent <= filter.rent))
    )
  }

  renderPropertyMarkers = () => {
    const { properties, filter } = this.state;
    if (properties) {
      return properties
      .filter(this._filter)
      .map((property, i) => {
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
    console.log("Size", window.screen)
    return (
        <Map center={position} zoom={zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://api.mapbox.com/styles/v1/asher978/cjfrj83ad64ti2smv09m6qm0b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2pmcm42dTU3MDVxaTJxczM3dm1ndjUwMiJ9.jqOnJvWmyibbEtrDY3zSCQ"
            />

            <MarkerClusterGroup
              showCoverageOnHover={false}
              spiderfyDistanceMultiplier={2}
              iconCreateFunction={createClusterCustomIcon}
            >
              { this.renderPropertyMarkers() }
            </MarkerClusterGroup>

        </Map>
    )
}
  render () {
    const { posReceived, filter } = this.state;
    const { classes } = this.props;
    return (
      <div className="PropertyMap-mapContainer-206">

        <MapFilters
          filter={filter}
          handleFilterChange={this.handleFilterChange}
          handleFilterBedrooms={this.handleFilterBedrooms}
        />

        { posReceived && this.renderMap() }
      </div>
    )
  }
}

export default PropertyMap;