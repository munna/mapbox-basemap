import React, {createRef} from "react";
import ReactDOM from "react-dom";
import mapboxgl, {Map, Popup} from 'mapbox-gl';
import  MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { fromJS } from 'immutable';
import { MapboxLayerSwitcherControl } from 'mapbox-layer-switcher';
import defaultMapStyleJson from '../style.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-layer-switcher/styles.css';

let jsonStyle = JSON.stringify(defaultMapStyleJson).replace(
    /{REACT_APP_HERE_APP_ID}/g,
    process.env.REACT_APP_HERE_APP_ID,
  );
  jsonStyle = JSON.parse(
    jsonStyle.replace(
      /{REACT_APP_HERE_APP_CODE}/g,
      process.env.REACT_APP_HERE_APP_CODE,
    ),
  );
  
  var defaultMapStyle = fromJS(jsonStyle);


class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.geocoder = null;
        this.geocoderRef = createRef();
        mapboxgl.accessToken =process.env.REACT_APP_MAPBOX_KEY;
        this.state = {coordinate : []}
        this.popup = new Popup({closeButton: true});
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    componentDidMount() {
        this.initMap();
    
    }
    initMap() {
        this.map = new mapboxgl.Map({container:'map',
        style: jsonStyle,
        accessToken:mapboxgl.accessToken,
        center: [78.9629,20.5937],
        zoom: 4,
        
    });
    this.map.on('click',this.handleMapClick);
    this.map.on('mousemove',this.geocoder,this.handleMouseMove);
    this.map.on('mouseleave',this.handleMouseLeave);
    this.addMapControls();
    }
    addMapControls() {
        const styles = [];
        defaultMapStyleJson.layers.forEach(element => {
          if (element.base === 'true') {
            styles.push({
              id: element.id,
              title: element.title,
              type: 'base',
              visibility: element.layout.visibility,
            });
          }
        });
        styles.push({
            id: 'composite',
            title: 'MapBox Train',
            type: 'base',
            visibility: 'none',
          });
        this.map.addControl(new MapboxLayerSwitcherControl());
        this.geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: true,
          mapboxgl: mapboxgl
        });
        this.geocoder.onAdd(this.map);
        this.geocoder.addTo('#geocoder');
    }
    handleMapClick(e) {
        // console.log(e.lnglat);
        this.setState({coordinate: e.lngLat},()=>{
          this.props.setMapUpdate({type: 'coordinate', dt: new Date() });
        });
    }
    handleMouseLeave(e) {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
    }
    handleMouseMove(e) {
      console.log(e);
      if(e.features == undefined)
        return;
      this.map.getCanvas().style.cursor = 'pointer';

      // Single out the first found feature.
      var feature = e.features[0];

      // Display a popup with the name of the county
      this.popup.setLngLat(e.lngLat)
          .setText('Munna bhakta')
          .addTo(this.map);
    }
  render() {
    return (
    <div id="map"><div id="geocoder" className="geocoder"></div>
    </div>);
  }
}
export default MapComponent;
