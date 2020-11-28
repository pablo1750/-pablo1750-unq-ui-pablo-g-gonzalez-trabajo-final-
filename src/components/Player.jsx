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

  //dejo un tiempo de espera para que parezca que la cpu esta pensando antes de decidir
  if(props.data.type === USER_TYPE.CPU) {
    setTimeout(() => {
      props.onReady();
    }, 500);
  }

  return (
    <div className={`card text-white ${props.turn ? "bg-primary" : "bg-secondary"}`}>
      <div className="card-header">{props.data.name}</div>
      <div className="card-body">
        <p className="card-title">{props.data.score}</p>
        <p className="card-text">
          <Choice card={props.data.cardSelected} show={props.show} />
        </p>
        {props.data.type === USER_TYPE.HUMAN &&
          <button className="btn btn-success" onClick={props.onReady} disabled={!props.turn}>
            Ready

          </button>
        }
        {props.data.type === USER_TYPE.CPU && props.turn &&
          <button className="btn btn-success" onClick={props.onReady} disabled>
            <div className="spinner-border  spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div> Wait
          </button>
        }
      </div>
    </div>
  )
}
