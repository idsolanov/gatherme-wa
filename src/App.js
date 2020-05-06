
import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import MyProfile from './components/MyProfile/MyProfile';
import Profile from './components/Profile/Profile';


import CreateActivity from './components/CreateActivity/CreateActivity';

import {  BrowserRouter,Route, Switch} from 'react-router-dom'; 



function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
         
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/createActivity" component={CreateActivity}/>
          <Route exact path="/MyProfile" component={MyProfile}/>
          <Route exact path="/Profile/:username" component={Profile}/> 


        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
