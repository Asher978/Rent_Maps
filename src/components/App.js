import React, { Component } from 'react';
import '../styles/app.css';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';

class App extends Component {
  constructor () {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  };

  renderMap () {
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
        <Map center={position} zoom={zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Tooltip permanent>
                <span>Hello...</span>
              </Tooltip>
              <Popup>
                <span>Ash<br/>S.</span>
              </Popup>
            </Marker>
        </Map>
    )
}
  render () {
    return (
      <div>
        <h1>Maps</h1>
        { this.renderMap() }
      </div>
    )
  }
}

export default App;