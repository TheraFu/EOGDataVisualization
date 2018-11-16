import React, {Component} from 'react';
import MapGL, {Marker} from 'react-map-gl';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import PlaceIcon from "@material-ui/icons/Place"
import * as actions from "../store/actions";
import connect from "react-redux/es/connect/connect";


const styles = {
    card: {
        margin: "8% 15%"
    }
};

const TOKEN = 'pk.eyJ1IjoidGhlcmFmdSIsImEiOiJjam9qNzkxbjIwMjcxM2tsZnN0YXR6c3ppIn0.2GSpDELxZdJNhlQ8OCJD9g';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            time: Date.now(),
            viewport: {
                width: 885,
                height: 500,
                latitude: 29.7604,
                longitude: -95.3698,
                zoom: 4
            }});

    }

    componentDidMount() {
        this.props.fetchData();
        this.timer = setInterval(() => this.setState({time: Date.now()}), 1000);
        this.fetchTimer = setInterval(() => this.props.fetchData(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchTimer);
        clearInterval(this.timer);
    }

    render() {
        const {
            metric,
            latitude,
            longitude,
            timestamp,
            classes } = this.props;
        let lastUpdate = Math.ceil((this.state.time - timestamp)/1000);
        lastUpdate = lastUpdate > 0 ? lastUpdate : 0;
        return (
            <Card className={classes.card}>
                <MapGL
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    {...this.state.viewport}
                    onViewportChange={(viewport) => {this.setState({viewport});console.log(this.state)}}
                    mapboxApiAccessToken={TOKEN}
                >
                    <Marker
                        longitude = {longitude}
                        latitude = {latitude}><PlaceIcon color="error"/></Marker>
                </MapGL>
                <CardContent>
                    <b>Metric:</b> {metric+" "}
                    <b>Latitude:</b> {latitude+" "}
                    <b>Longitude:</b> {longitude+" "}
                    <b>Last updated:</b> {lastUpdate} seconds ago</CardContent>
            </Card>
        );
    }
}


const mapState = (state, ownProps) => {
    const {
        loading,
        metric,
        latitude,
        longitude,
        timestamp,
    } = state.drone;
    return {
        loading,
        metric,
        latitude,
        longitude,
        timestamp
    };
};

const mapDispatch = dispatch => ({
    fetchData: () =>
        dispatch({type: actions.FETCH_DRONE})
});

export default connect(
    mapState,
    mapDispatch
)(withStyles(styles)(Map));