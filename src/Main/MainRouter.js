import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Map from '../Map/Map';
import VRVideo from '../VR/VRVideo';

const chatComponent = () => (<div style={{ border: '1px red solid' }}>Chat</div>)

export const routes = [
  {
    path: '/Chat',
    title: 'Chat',
    icon: 'chat',
    component: chatComponent,
  },
  {
    path: '/Map',
    title: 'Map',
    icon: 'map',
    component: Map,
  },
  {
    path: '/VR',
    title: 'VR',
    icon: 'cast',
    component: VRVideo,
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