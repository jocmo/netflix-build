import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen'
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen'

function App() {
  const user = useSelector(selectUser); //give the user back

  const dispatch = useDispatch();

  useEffect(() => {

    //user listener
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    
    <div className="app">
      <Router>
      {!user ? (<LoginScreen/>) : (
        
        <Switch>
          <Route path="/profile">
            <ProfileScreen/>
          </Route>
          <Route path="/">
            <HomeScreen/>
          </Route>
        </Switch>
      
      )}
      </Router>
    </div>
  );
}

export default App;

