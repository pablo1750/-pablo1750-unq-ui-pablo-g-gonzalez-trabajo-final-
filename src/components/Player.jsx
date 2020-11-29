import React, { useEffect, useState } from 'react';
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
    index: 0,
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
  const [choising, setChoising] = useState(false);

  useEffect(() => {
    setChoising(false);
  }, [props.status]);


  const onChoiceClick = () => {
    setChoising(true);
    props.onReady();
  }

  return (
    <div className={`card player text-white ${props.turn ? "bg-primary" : "bg-secondary"} ${props.data.status == PLAYER_STATUS.ROUND_WINNER && "blink bg-warning"}`} style={{minWidth: "160px"}}>
      <div className="card-header">
        {props.data.name} {props.data.victories > 0 && <span class="badge badge-primary badge-pill" title="victories">{props.data.victories}</span>}
      </div>
      <div className="card-body">
        

        <div className="card-text text-center mb-3">
          <Choice card={props.data.cardSelected} show={props.show} />
        </div>
        {props.data.type === USER_TYPE.HUMAN && props.turn &&
          <button className="btn btn-success" onClick={onChoiceClick} disabled={!props.turn}>
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
        {!props.turn && false &&
          <button className="btn btn-success" onClick={props.onReady} disabled>
            Waiting
          </button>
        }
        {props.data.status == PLAYER_STATUS.PLAYING && false &&
          <div className="alert alert-info">Playing</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_WINNER &&
          <div className="alert alert-success m-1 p-1">Winner ({props.data.score})</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_LOST &&
          <div className="alert alert-danger m-1 p-1">Loser ({props.data.score})</div>
        }
        {props.data.status == PLAYER_STATUS.ROUND_TIED &&
          <div className="alert alert-success m-1 p-1">Tied ({props.data.score})</div>
        }

      </div>
    </div>
  )
}
