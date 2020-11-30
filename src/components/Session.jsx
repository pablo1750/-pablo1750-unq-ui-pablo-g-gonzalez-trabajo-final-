import React, { useEffect, useState } from 'react';
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
    setOk(data.playersSlots.length === 0);
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
    setData(emptySession);
  }

  const handleStart = () => {
    setData({...data, state: SESSION_STATE.START});
  }
  
  const handleRemovePlayer = (player) => {
    setData({...data, players: data.players.filter(item => item !== player)});
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
                  {ok && <button className="btn btn-success m-1" onClick={handleStart}>Board</button>}
                  {data.players.length > 0 && <button className="btn btn-danger m-1" onClick={handleRestart}>Restart</button>}
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
                        <span className="badge badge-secondary badge-pill">{player.victories}</span>
                      </li>
                    )}

                    {data.playersSlots.map(playerSlot => 
                      <li className="list-group-item" key={playerSlot.index}>
                        <PlayerConfig data={playerSlot} onConfirmPlayer={(player) => {handleConfirmPlayer(playerSlot, player)}} onCancelPlayer={() => handleRemovePlayerSlot(playerSlot)}/>
                      </li>
                    )}

                    {ok && 
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
