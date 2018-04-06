import React, { Component } from 'react';
import '../styles/app.css';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

class App extends Component {
  constructor () {
    super()
    this.state = {
      lat: 40.7128,
      lng: -74.0060,
      zoom: 14,
      posReceived: true
    }
  };

  componentDidMount() {
    console.log("CDM")
    this.getPosition();
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
              <Marker position={[49.8397, 24.0297]} />
              <Marker position={[52.2297, 21.0122]} />
              <Marker position={[51.5074, -0.0901]} />
            </MarkerClusterGroup>


            {/* <Marker position={position}>
              <Tooltip permanent>
                <span>Hello...</span>
              </Tooltip>
              <Popup>
                <span>Ash<br/>S.</span>
              </Popup>
            </Marker> */}
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

export default App;