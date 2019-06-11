import React from 'react'
import { theme } from './appConfig'
import { MuiThemeProvider } from '@material-ui/core'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, withStyles, StylesProvider } from '@material-ui/styles'
import MainRouter from './Main/MainRouter'
//import rtl from 'jss-rtl'

const styleNode = document.createComment("jss-insertion-point");
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  //plugins: [...jssPreset().plugins, rtl()],
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});



const App = props => {
  const { classes } = props

  console.log(window.location)

  return (
    <StylesProvider jss={jss} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.App}>
          <MainRouter />
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

const Styles = {
  App: {
    margin: '5vh',
  }
}

export default withStyles(Styles)(App)