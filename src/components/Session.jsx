import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Board } from './Board';
import { playerEmpty, PLAYER_STATUS } from './Player';
import { PlayerConfig } from './PlayerConfig';


export const SESSION_STATE = {
  CONFIG: 0,
  START: 1,
  PLAYER_READY: 2,
  END_ROUND: 3,
  SHOW_CARDS: 4,
  SHOW_RESULTS: 5
}

export const emptySession = {
    playersSlots: [
      {...playerEmpty(true), index: 1},
      {...playerEmpty(true), index: 2},
    ],
    players: [],
    start: false,
    state: SESSION_STATE.CONFIG,
    playersCounter: 2
  }

export const Session = (props) => {

  const [data, setData] = useState(emptySession);
  const [ok, setOk] = useState(false);

  useEffect(() => { 
    //update every players settings ok for start
    setOk(data.playersSlots.length === 0 );
  }, [data.playersSlots] );

  const handleExitBoard = (players) => {
    setData({
      ...data, 
      state: SESSION_STATE.CONFIG,
      players: players.map(player => ({
        ...player, 
        //deselecciono la carta
        cardSelected: undefined, 
        //reinicio el score
        score: 0, 
        //si no hubo ganador y est jugador perdio, no juega la siguiente ronda
        status: PLAYER_STATUS.PLAYING,
      })) 
    });
  }  

  const handleRestart = () => {
    Swal.fire({
      icon: 'question',
      html: `Are you sure to restart?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      focusCancel: true,
      focusConfirm: false,
      timer: 4000,
      timerProgressBar: true,
    }).then((result) => {
      result.isConfirmed && setData(emptySession);
    })
  }

  const handleStart = () => {
    setData({...data, state: SESSION_STATE.START});
  }
  
  const handleRemovePlayer = (player) => {
    Swal.fire({
      icon: 'info',
      html: `Are you sure to eliminate ${player.name}?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      focusCancel: true,
      focusConfirm: false,
      timer: 4000,
      timerProgressBar: true,
    }).then((result) => {
      result.isConfirmed && setData({
        ...data, 
        players: data.players.filter(item => item !== player),
      });
    })
  }

  const handleRemovePlayerSlot = (slot) => {
    setData({...data, playersSlots: data.playersSlots.filter(item => item !== slot)});
  }

  const handleConfirmPlayer = (playerSlot, player) =>{
    setData({
      ...data, 
      players: [
        ...data.players, player
      ],
      playersSlots: data.playersSlots.filter(slot => playerSlot !== slot)
    });
  };

  const handleAddPlayerSlot = () => {
    setData({
      ...data, 
      playersSlots: [{ ...playerEmpty(false), index: data.playersCounter + 1 } ], 
      playersCounter: data.playersCounter + 1, 
    });
  }


  return (
    <>
        <div className={`container overflow-auto ${data.state == SESSION_STATE.CONFIG && "w3-animate-top"}`}>
          {data.state == SESSION_STATE.CONFIG &&
            <>
              <div className="row" style={{minHeight: "55px"}}>
                <div className="col col-12 mh-100">
                  {data.players.length > 0 && <button className="btn btn-danger m-1" onClick={handleRestart}>Restart</button>}
                  {data.players.length > 1 && data.playersSlots.length == 0 && <button className="btn btn-success m-1" onClick={handleStart}>Play</button>}
                </div>   
              </div>
              <div className="row">
                <div className="col col-2 d-none d-sm-none d-md-block"> </div>
                <div className="col col-12 col-md-8 "> 
                  <ul className="list-group">

                    <li className="list-group-item align-items-center">
                      Players
                    </li>

                    {data.players.map(player => 
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={`playerOk-${player.index}`}>
                        {player.name}
                        <span>
                          <span className="badge badge-secondary badge-pill">{player.victories}</span>
                          <a className="btn btn-outline-primary btn-sm ml-2" onClick={() => {handleRemovePlayer(player)}}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                          </a>
                        </span>
                        
                      </li>
                    )}

                    {data.playersSlots.map(playerSlot => 
                      <li className="list-group-item" key={playerSlot.index}>
                        <PlayerConfig data={playerSlot} onConfirmPlayer={(player) => {handleConfirmPlayer(playerSlot, player)}} onCancelPlayer={() => handleRemovePlayerSlot(playerSlot)}/>
                      </li>
                    )}

                    {data.playersSlots.length == 0 && 
                      <li className="list-group-item">
                        <button className="btn btn-primary" onClick={handleAddPlayerSlot}>Add Player</button>
                      </li>
                    }
                  </ul>  
                </div>
                <div className="col col-2 d-none d-sm-none d-md-block"> </div>
              </div>
            </>
          }
        </div>


        <div className={`container overflow-auto ${data.state >= SESSION_STATE.START && "w3-animate-top"}`}>
          {data.state >= SESSION_STATE.START &&
            <Board players={data.players} onExitBoard={handleExitBoard}/>
          }
        </div>

    </>

  )
}
