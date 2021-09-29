import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomeScreen } from './screens/home-screen/HomeScreen';
import { MovieScreen } from './screens/movie-screen/MovieScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route path="/movie" component={MovieScreen}/>
      </Switch>
    </Router>
  );
}

export default App;
