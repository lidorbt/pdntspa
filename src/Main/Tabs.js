import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { routes } from './MainRouter'
import { Icon, Tab, Tabs, Paper } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    bottom: 0,
    position: 'fixed',
    width: '100%'
  },
});

const MainTabs = (props) => {

  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Tabs centered value={`${props.location.pathname}`} variant="fullWidth" indicatorColor="secondary" textColor="secondary" >
        {routes.map((route, index) => {
          return (
            <Tab key={index} label={route.title} value={route.path} icon={<Icon>{route.icon}</Icon>} component={Link} to={`${route.path}`} />)
        })}
      </Tabs>
    </Paper>
  );
}

export default withRouter(MainTabs);