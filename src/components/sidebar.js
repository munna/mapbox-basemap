import React, {Component} from 'react';
export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {mapLoaded: false};
        this.mapComponent = this.props.mapRef.current;
        
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.mapUpdate != this.props.mapUpdate) {
            console.log(nextProps.mapUpdate);
            console.log(this.mapComponent.state.coordinate);
        }
        if(nextProps.mapRef != this.props.mapRef && nextProps.mapRef != null) {
            this.mapComponent = nextProps.mapRef;
            this.setState({mapLoaded: true},()=>{
              console.log('MapLoaded')
            });
        }
    }
    render() {
        if(!this.state.mapLoaded) {
            return <div></div>
        }
        const { coordinate } = this.mapComponent.state;
        return <div className='sidebar'>
                <div className='heading'>
                <h1>Our locations</h1>
                </div>
                <div id='listings' className='listings'>
                    {JSON.stringify(coordinate)}
                </div>
            </div>
    }
}