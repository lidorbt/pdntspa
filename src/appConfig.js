import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#fff',
      main: '#000000',
      // dark: '#fff',
      // contrastText: '#fff',
    },
    secondary: {
      // light: '#fff',
      main: '#455A64',
      // dark: '#fff',
      // contrastText: '#fff',
    },
    error: {
      // light: '#fff',
      main: '#D32F2F',
      // dark: '#fff',
      // contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Tahoma',
      'Geneva',
      'Verdana',
      'sans - serif'
    ].join(','),
  },
})
