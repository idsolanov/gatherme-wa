
import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import MyProfile from './components/MyProfile/MyProfile';
import Profile from './components/Profile/Profile';
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
          <Route exact path="/MyProfile" component={MyProfile}/>
          <Route exact path="/Profile/:username" component={Profile}/> 
          <Route exact path="/editProfile" component={EditProfile}/>


        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;
