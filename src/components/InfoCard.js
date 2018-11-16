import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../store/actions";
import connect from "react-redux/es/connect/connect";

const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
    card: {
        margin: "12% 25%"
    }
};

class InfoCard extends Component{

    constructor(props) {
        super(props);
        this.state = ({time: Date.now()});
    }

    componentDidMount() {
        this.props.fetchData();
        this.timer = setInterval(() => this.setState({time: Date.now()}), 1000);
        this.fetchTimer = setInterval(() => this.props.fetchData(), 2000);

    }

    componentWillUnmount() {
        clearInterval(this.fetchTimer);
        clearInterval(this.timer)
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
                <CardHeader title="Real Time Drone Info"/>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText>Metric:  {metric}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Latitude:  {latitude}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Longitude:  {longitude}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Last Update: {lastUpdate} seconds ago</ListItemText>
                        </ListItem>
                    </List>
                </CardContent>
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
)(withStyles(styles)(InfoCard));