import React, { useEffect } from 'react';
import { getRandomInt } from './Board';
import { Choice } from './Choice';
import { VictoriesCounter } from './VictoriesCounter';

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
    cardSelected: undefined,
    status: PLAYER_STATUS.PLAYING,
  }
}

export const PlayerIcon = ({type}) => {
  return (
    <>
      {type === USER_TYPE.HUMAN && 
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
        </svg>        
      }
      {type === USER_TYPE.CPU && 
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cpu" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
        </svg>    
      }
    </>
  )
}


export const Player = ({data, onReady, onRandomCardSelect, onCoveredCardSelect, turn, show}) => {


  useEffect(()=>{

    //si es el turno, esta jugando y es cpu, 
    //se pone listo y espera entre 600 y 1499 ms para hacer una eleccion de carta aleatoria 
    if(turn && data.status === PLAYER_STATUS.PLAYING && data.type === USER_TYPE.CPU){  
      onReady(true);
      setTimeout(() => {
        onRandomCardSelect();
      }, getRandomInt(600, 1500));
    }

    //si perdio la ronda y se esta desempatando, pone una carta cubierta
    if(turn && data.status === PLAYER_STATUS.ROUND_LOST){
      onCoveredCardSelect();
    }

  }, [turn])


  return (
    <div className={`card player text-white ${turn ? "bg-primary" : "bg-secondary"} ${data.status === PLAYER_STATUS.ROUND_WINNER && "blink bg-warning"}`} style={{minWidth: "160px"}}>
      
      <div className="card-header  d-flex justify-content-between align-items-center p-2" style={{minHeight: "38px"}}>
        <PlayerIcon type={data.type} />
        <VictoriesCounter victories={data.victories}/>
      </div>

      <div className="card-body p-2">    

        <div className="card-title">
          {data.name.substring(0,6)}{data.name.length>6 && "…"}
        </div>

        <div className="card-text text-center mb-3">
          <Choice card={data.cardSelected} show={show} />
        </div>

        <div style={{minHeight: "40px"}}>
          {data.type === USER_TYPE.HUMAN && turn &&
            <button className="btn btn-success" onClick={onReady} disabled={!turn}>
              Choice
            </button>
          }
          {data.type === USER_TYPE.CPU && turn &&
            <button className="btn btn-success" disabled>
              <div className="spinner-border  spinner-border-sm text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div> Choosing
            </button>
          }
          {data.status === PLAYER_STATUS.ROUND_WINNER &&
            <div className="alert alert-success m-1 p-1">Winner ({data.score})</div>
          }
          {data.status === PLAYER_STATUS.ROUND_LOST &&
            <div className="alert alert-danger m-1 p-1">Loser ({data.score})</div>
          }
          {data.status === PLAYER_STATUS.ROUND_TIED &&
            <div className="alert alert-success m-1 p-1">Tied ({data.score})</div>
          }
        </div>
      </div>
    </div>
  )
}
