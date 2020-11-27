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
    <div className="card">
      <div className={`card-header ${props.turn ? "bg-primary" : "bg-secondary"}`}>{props.data.name}</div>
      <div className="card-body">
        <h5 className="card-title">Primary card title</h5>
        <p className="card-text">
          <Choice card={props.data.cardSelected} show={props.data.show} />
        </p>
      </div>
      
    </div>
  )
}
