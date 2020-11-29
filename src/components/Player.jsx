import React, { useState } from 'react';
import { Choice } from './Choice';

export const USER_TYPE = {
  CPU: 0,
  HUMAN: 1
}

export const PLAYER_STATUS = {
  PLAYING: 0,
  ROUND_WINNER: 1,
  ROUND_LOST: 2,
  ROUND_TIED: 3
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
    status: PLAYER_STATUS.PLAYING,
  }
}

export const Player = (props) => {
  return (
    <div className={`card text-white ${props.turn ? "bg-primary" : "bg-secondary"}`}>
      <div className="card-header">
        {props.data.name} {props.data.victories > 0 && <span class="badge badge-primary badge-pill" title="victories">{props.data.victories}</span>}
      </div>
      <div className="card-body">
        <p className="card-text">
          <Choice card={props.data.cardSelected} show={props.show} />
        </p>
        {props.data.type === USER_TYPE.HUMAN && props.turn &&
          <button className="btn btn-success" onClick={props.onReady} disabled={!props.turn}>
            Choice {props.readyCountDown > 0 && <span>({props.readyCountDown})</span>}
          </button>
        }
        {props.data.type === USER_TYPE.CPU && props.turn &&
          <button className="btn btn-success" onClick={props.onReady} disabled>
            <div className="spinner-border  spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div> Choosing
          </button>
        }
        {!props.turn &&
          <button className="btn btn-success" onClick={props.onReady} disabled>
            Waiting
          </button>
        }
        {props.data.status == PLAYER_STATUS.PLAYING &&
          <div className="alert alert-info">Playing</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_WINNER &&
          <div className="alert alert-success">Winner ({props.data.score})</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_LOST &&
          <div className="alert alert-danger">Loser ({props.data.score})</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_TIED &&
          <div className="alert alert-success">Tied ({props.data.score})</div>
        }
      </div>
    </div>
  )
}
