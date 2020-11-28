import React, { useEffect, useState } from 'react';
import { cards, emptyCard } from './Cards';
import { Player, playerEmpty } from './Player';
import { PlayerConfig } from './PlayerConfig';
import { Slot } from './Slot';

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
      playerEmpty(true),
      playerEmpty(true),
    ],
    start: false,
    current: null,
    endRound: false,
    state: SESSION_STATE.CONFIG
  }

export const Session = (props) => {

  const [data, setData] = useState(emptySession);
  
  const [ok, setOk] = useState(false);

  useEffect(() => { 
    //update every players settings ok for start
    setOk(data.playersSlots.every((player, index) => player.ok));
  }, [data.playersSlots] );

  useEffect(() => {
    //update end of round (si todos tienen carta seleccionada)
    if(data.playersSlots.every(player => !!player.cardSelected)){
      setData({
        ...data, 
        state : SESSION_STATE.END_ROUND
      });
    }
  }, [data.current] );

  useEffect(() => {
    if(data.endRound){
      alert("end round")
    }

  }, [data.endRound] );

  const nextTurn = () => {
    return data.current + 1;
  }

  const handleRemovePlayer = (index) => {
    setData({...data, playersSlots: data.playersSlots.filter((player, j) => j !== index)});
  }

  const handleConfirmPlayer = (index, player) =>{
    setData({
      ...data, 
      playersSlots: data.playersSlots.map((item, j) => {
        return (j === index) ? player : item;
      })
    });
  };

  const handleAddPlayerSlot = () => {
    setData({...data, playersSlots: [...data.playersSlots, playerEmpty(false)] });
  }

  const handleCardSelect = (card) => {
    setData({
      ...data, 
      playersSlots: data.playersSlots.map((item, j) => {
        return (j === data.current) ? {...item, cardSelected: card} : item;
      }),
      current: nextTurn(),
      state: SESSION_STATE.START
    });
  }

  const handleStart = () => {
    setData({...data, state: SESSION_STATE.START, current : 0});
  }

  const handleShowCards = () => {
    setData({...data, state: SESSION_STATE.SHOW_CARDS});
    setTimeout(()=>{handleShowResults()}, 1000)
  }

  const handleShowResults = () => {
    setData({...data, state: SESSION_STATE.SHOW_RESULTS});
  }

  
  const handleRestart = () => {
    setData(emptySession);
  }

  const handleExitBoard = () => {
    setData({
      ...data, 
      state: SESSION_STATE.CONFIG,
      current: null,
      playersSlots: data.playersSlots.map(item => ({...item, cardSelected: undefined})) 
    });
  }  

  const handleNextRound = () => {
    setData({
      ...data, 
      state: SESSION_STATE.START,
      current: 0,
      playersSlots: data.playersSlots.map(item => ({...item, cardSelected: undefined})) 
    });
  }

  const handlePlayerReady = () => {
    setData({...data, state: SESSION_STATE.PLAYER_READY});
  }

  return (
    <>
      

        {data.state == SESSION_STATE.CONFIG &&
          <div className="row game-settings open fixed-top">
            <ul className="list-group col-12">
              {data.playersSlots.map((player, index) => {
                return player.ok && <li className="list-group-item" key={`playerOk-${index}`}><span>{player.name}</span></li>
              })}
              {data.playersSlots.map((player, index) => {
                return !data.start && !player.ok && <li className="list-group-item" key={`playerSlot-${index}`}>
                  <PlayerConfig index={index} data={player} onRemovePlayer={handleRemovePlayer} onConfirmPlayer={handleConfirmPlayer}/>
                  {!player.readonly && <><button onClick={() => handleRemovePlayer(index)}>Remove</button></>}
                </li>
              })}
              {ok && <li className="list-group-item"><button onClick={handleAddPlayerSlot}>Add Player</button></li>}
              {ok && <li className="list-group-item"><button onClick={handleStart}>Start</button></li>}
              <li className="list-group-item"><button onClick={handleRestart}>Restart Game</button></li>
            </ul>
          </div>
        }

        {data.state >= SESSION_STATE.START &&

          <div className="container fixed-top overflow-auto" style={{height: "100%"}}>
            <div className="row">
              <div className="col col-12">
                <button onClick={handleExitBoard}>Exit board</button>
                {data.state == SESSION_STATE.END_ROUND && <button onClick={handleShowCards}>Show Cards</button>}
                {data.state == SESSION_STATE.SHOW_RESULTS && <button onClick={handleNextRound}>Next Round</button>}
              </div>   

              {data.playersSlots.map((player, index) => player.ok && 
                
                <Player key={`playerSession-${index}`} data={player} onReady={handlePlayerReady} turn={index == data.current} show={data.state >= SESSION_STATE.SHOW_CARDS} />
                
              )}  
            </div>
          </div>
        }
        {data.state === SESSION_STATE.PLAYER_READY &&
          <div className="container fixed-bottom">
            <div className="row">
              {cards.map(card => 
                <div className="col m-0 p-0" key={`slot_${card.name}`}>
                  <Slot card={card} onSelect={() => handleCardSelect(card)} player={data.playersSlots[data.current]}/>
                </div> 
              )} 
            </div>
          </div>
        }
    </>

  )
}
