import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { routes } from './MainRouter'
import { Icon, Tab, Tabs, Paper } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

const MainTabs = (props) => {

  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Tabs
        centered
        value={routes.findIndex(route => route.path === props.location.pathname)}
      >

        {routes.map((route, index) => {
          return (<Link key={index} to={`${route.path}`} className={classes.navLink}>
            <Tab label={route.title} value={index} icon={<Icon>{route.icon}</Icon>} />
          </Link>)
        })}

      </Tabs>
    </Paper>
  );
}

export default withRouter(MainTabs);