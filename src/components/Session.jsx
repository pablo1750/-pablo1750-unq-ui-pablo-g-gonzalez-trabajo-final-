import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PlayersContext, {clearPlayers, exitPlayers} from '../providers/PlayersContext';
import { Board } from './Board';
import { Players } from './Players';


export const SESSION_STATE = {
  CONFIG: 0,
  START: 1,
}

export const Session = (props) => {

  const [data, setData] = useState({
    state: SESSION_STATE.CONFIG,
    playersOk: true,
  });
  
  const [players, setPlayers] = useState([]);

  const handleExitBoard = (players) => {
    setData({
      ...data, 
      state: SESSION_STATE.CONFIG,
    });
    exitPlayers(setPlayers);
  }  

  const handleRestartClick = () => {
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
      if(result.isConfirmed){
        clearPlayers(setPlayers);  
      } 
    })
  }

  const handleStartClick = () => {
    setData({...data, state: SESSION_STATE.START});
  }
  
  const handlePlayersOkChange = (playersOk) => {
    setData({...data, playersOk: playersOk})
  }

  return (
    <>
      <PlayersContext.Provider value={[players, setPlayers]}>
        <div className={`container overflow-auto ${data.state === SESSION_STATE.CONFIG && "w3-animate-top"}`}>
          {data.state === SESSION_STATE.CONFIG &&
            <>
              <div className="row" style={{minHeight: "55px"}}>
                <div className="col col-12 mh-100">
                  {players.length > 1 && <button className="btn btn-danger m-1" onClick={handleRestartClick}>Restart</button>}
                  {players.length > 1 && data.playersOk && <button className="btn btn-success m-1" onClick={handleStartClick}>Play</button>}
                </div>   
              </div>
              <Players onPlayersOkChange={handlePlayersOkChange}/>
            </>
          }
        </div>


        <div className={`container overflow-auto ${data.state >= SESSION_STATE.START && "w3-animate-top"}`}>
          {data.state >= SESSION_STATE.START &&
            <Board onExitBoard={handleExitBoard}/>
          }
        </div>
      </PlayersContext.Provider>
    </>

  )
}
