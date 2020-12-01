import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Intro } from './Intro';
import { Nav } from './Nav';
import { Session } from './Session';

export const Game = (props) => {
  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route path="/unq-ui-pablo-g-gonzalez-trabajo-final/game" component={Session}/>
          <Route path="/unq-ui-pablo-g-gonzalez-trabajo-final/" component={Intro}/>
          <Route path="/game">
            <Redirect to={"/unq-ui-pablo-g-gonzalez-trabajo-final/game"} />
          </Route>
          <Route path="*">
            <Redirect to={"/unq-ui-pablo-g-gonzalez-trabajo-final/"} />
          </Route>
        </Switch>
      </Router>
      
    </>
  )
}
