import React, { createRef } from "react";
import ReactDOM from "react-dom";
import MapComponent from './components/map';
import SideBar from './components/sidebar';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mapUpdate : {},mapLoaded: false};
    this.mapRef = createRef();
  }
  render() {
    return <>
      <SideBar mapRef = {this.mapRef} mapUpdate={this.state.mapUpdate} />
      <MapComponent ref ={(ref)=>{this.mapRef = ref; if(this.state.mapLoaded === false ) {this.setState({mapLoaded:true})} }} setMapUpdate ={(data)=>{ this.setState({mapUpdate:data})}}  />
      </>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = 'pk.eyJ1IjoibXVubmFiaGFrdGEiLCJhIjoiY2piYzQ5MXUwMWZhYzJxcmo5Njk0ZzkwNSJ9.kcVCdJO6I-kJsWNHB9Lumw';
// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v11'
// });
