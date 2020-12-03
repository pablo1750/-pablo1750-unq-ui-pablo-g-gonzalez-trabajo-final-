import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Intro } from './Intro';
import { Nav } from './Nav';
import { Session } from './Session';

export const Game = (props) => {
  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route path="/game" component={Session}/>
          <Route path="*" component={Intro}/>

        </Switch>
      </Router>
    </>
  )
}
