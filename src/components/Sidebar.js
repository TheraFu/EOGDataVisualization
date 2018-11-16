import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import ChartIcon from '@material-ui/icons/InsertChart';
import Header from "./Header";
import { Link } from "react-router-dom";


const drawerWidth = 80;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header className={classes.appBar}/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.toolbar} />
                <List>
                    <Link to='/info'>
                    <ListItem button>
                            <ListItemIcon><DashboardIcon/></ListItemIcon>
                    </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/map'>
                    <ListItem button>
                            <ListItemIcon><MapIcon/></ListItemIcon>
                    </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/chart'>
                    <ListItem button>
                            <ListItemIcon><ChartIcon/></ListItemIcon>
                    </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
