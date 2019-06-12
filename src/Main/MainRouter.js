import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const chatComponent = () => (<div>Chat</div>)
const mapComponent = () => (<div>Map</div>)
const vrComponent = () => (<div>VR</div>)

export const routes = [
  {
    path: '/Chat',
    title: 'Chat',
    icon: 'dashboard',
    component: chatComponent,
  },
  {
    path: '/Map',
    title: 'Map',
    icon: 'dashboard',
    component: mapComponent,
  },
  {
    path: '/VR',
    title: 'VR',
    icon: 'dashboard',
    component: vrComponent,
  },
]

const MainRouter = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={`${route.path}`}
          exact
          component={route.component} />
      ))}
      <Redirect to={`${routes[0].path}`} />
    </Switch>)
}

export default MainRouter