import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Map from '../Map/Map';
import Chat from '../Chat/Chat';

const chatComponent = () => (<div style={{ border: '1px red solid' }}>Chat</div>)
const vrComponent = () => (<div style={{ border: '1px red solid' }}>VR</div>)

export const routes = [
  {
    path: '/Chat',
    title: 'Chat',
    icon: 'dashboard',
    component: Chat,
  },
  {
    path: '/Map',
    title: 'Map',
    icon: 'dashboard',
    component: Map,
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