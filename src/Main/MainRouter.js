import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Map from '../Map/Map';
import Chat from '../Chat/Chat';
import webrtcCam from '../Cam/webrtcCam';
import VRStreamContainer from '../VR/VRStreamContainer';

export const routes = [
  {
    path: '/Chat',
    title: 'Chat',
    icon: 'chat',
    component: Chat,
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
    component: VRStreamContainer,
  },
  {
    path: '/Cam',
    title: 'Camera',
    icon: 'camera',
    component: webrtcCam,
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