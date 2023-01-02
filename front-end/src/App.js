import React from 'react'
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import MainContainer from './components/MainContainer';
import PrivateRoute from './private-route/PrivateRoute';


const App = (props) => {

  return (
    <div>
      <NavBar/>

      <Route path='/' component={Login} exact/>
      <Route path='/register' component={Register}/>
      <PrivateRoute path='/home' component={MainContainer}/>
    </div>
  )
}

export default App;
