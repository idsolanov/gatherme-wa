import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';

import {  BrowserRouter,Route, Switch} from 'react-router-dom'; 



function App() {
  return (
    <div className="App">
      <Route render={({location}) => (
        <Switch location={location}>
         
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Register" component={Register}/>

        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;