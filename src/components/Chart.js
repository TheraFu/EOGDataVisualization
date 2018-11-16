import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React , {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import * as actions from "../store/actions";
import connect from "react-redux/es/connect/connect";
import moment from 'moment'

const styles = {
    card: {
        margin: "8% 14%",
        padding: "20px 20px"
    }
};

class Chart extends Component {

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

    render(){
        const {
            metric,
            latitude,
            longitude,
            timestamp,
            data,
            classes } = this.props;
        console.log(data);
        let lastUpdate = Math.ceil((this.state.time - timestamp)/1000);
        lastUpdate = lastUpdate > 0 ? lastUpdate : 0;
        return (
            <Card className={classes.card}>
                <LineChart width={800} height={400} data={data}
                           margin={{top: 30, right: 50, left: 20, bottom: 20}}>
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
                        padding={{left: 10, right: 30}}
                        type="number"
                        tickCount="20"
                        domain={['dataMin', 'dataMax']}
                    />
                    <YAxis
                        dataKey="metric"
                        padding={{top: 30, bottom: 30}}
                        tickFormatter = {(temp)=>temp.toFixed(2)}
                        type="number"
                        tickCount="8"
                        domain={['dataMin', 'dataMax']}/>
                    <Tooltip/>
                    <CartesianGrid stroke="#ccc" />
                    <Line type="monotone" dataKey="metric" stroke="#8884d8" dot={false}/>
                </LineChart>
                <CardContent>
                    <b>Metric:</b> {metric+" "}
                    <b>Latitude:</b> {latitude+" "}
                    <b>Longitude:</b> {longitude+" "}
                    <b>Last updated:</b> {lastUpdate} seconds ago</CardContent>
            </Card>
        )
    }
}

const mapState = (state, ownProps) => {
    const {
        metric,
        latitude,
        longitude,
        timestamp,
        data
    } = state.drone;
    return {
        metric,
        latitude,
        longitude,
        timestamp,
        data};
};

const mapDispatch = dispatch => ({
    fetchData: () =>
        dispatch({type: actions.FETCH_DRONE})
});

export default connect(
    mapState,
    mapDispatch
)(withStyles(styles)(Chart));