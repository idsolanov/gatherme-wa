
import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

import CreateActivity from './components/CreateActivity/CreateActivity';
import EditProfile from './components/EditProfile/EditProfile';

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
          <Route exact path="/Profile" component={Profile}/>
          <Route exact path="/editProfile" component={EditProfile}/>


        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
