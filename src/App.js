import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import {  BrowserRouter,Route, Switch} from 'react-router-dom'; 



function App() {
  return (
    <div>
      <Route render={({location}) => (
        <Switch location={location}>
         
          <Route exact path="/SignIn" component={SignIn}/>
          <Route exact path="/SignUp" component={SignUp}/>
        </Switch>
      )}>
      </Route>
    </div>
  );
}

export default App;