import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

const routes = [
  {
    path: 'Chat',
    component: <div>123</div>,
  },
  {
    path: 'Map',
    component: <div>1234</div>,
  },
  {
    path: 'VR',
    component: <div>12345</div>,
  },
]

const MainRouter = () => {
  return (
    <HashRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={`/${route.path}`}
            exact
            component={route.component} />
        ))}
        {/* <div>
          {window.location.pathname.includes('index.html') && <Redirect to={`/${routes[0].path}`} />}
        </div> */}
        <Redirect to={`/${routes[0].path}`} />
      </Switch>
    </HashRouter>)
}

export default MainRouter