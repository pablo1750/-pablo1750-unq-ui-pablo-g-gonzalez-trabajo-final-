import React, { useState } from 'react';
import { Choice } from './Choice';

export const USER_TYPE = {
  CPU: 0,
  HUMAN: 1
}

export const playerEmpty = (readonly) => {
  return {
    ok: false,
    name : "",
    victories : 0,
    score : 0,
    readonly : readonly,
    type: USER_TYPE.HUMAN,
    turn: false,
    choices: [],
    cardSelected: undefined,
    show: false,
  }
}

export const Player = (props) => {
  return (
    <div className={`card text-white player ${props.turn ? "bg-primary player-active" : "bg-secondary player-inactive"}`}>
      <div className="card-header">{props.data.name}</div>
      <div className="card-body">
        <p className="card-title">{props.data.score}</p>
        <p className="card-text">
          <Choice card={props.data.cardSelected} show={props.show} />
        </p>
      </div>
    </div>
  )
}
