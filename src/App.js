import React from 'react'
import './App.css';
import { theme } from './appConfig'
import { MuiThemeProvider } from '@material-ui/core'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, withStyles, StylesProvider } from '@material-ui/styles'
import MainRouter from './Main/MainRouter'
//import rtl from 'jss-rtl'
import MainTabs from './Main/Tabs'
import { HashRouter } from 'react-router-dom'

const generateClassName = createGenerateClassName()

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  //plugins: [...jssPreset().plugins, rtl()],
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});


const App = props => {
  const { classes } = props

  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.App}>
          <HashRouter>
            <MainRouter className={classes.tabs} />
            <MainTabs className={classes.content} />
          </HashRouter>
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

const Styles = {
  App: {
    height: '100%'
  },
  tabs: {
    height: '90%'
  },
  content: {
    height: '10%',

  }
}

export default withStyles(Styles)(App)