import React, { useEffect, useState } from 'react';
import { cards } from './Cards';
import { Player, playerEmpty } from './Player';
import { PlayerConfig } from './PlayerConfig';
import { Slot } from './Slot';

export const emptySession = {
    playersSlots: [
      playerEmpty(true),
      playerEmpty(true),
    ],
    start: false,
    current: null,
    endRound: false,
    
  }

export const Session = (props) => {

  const [data, setData] = useState(emptySession);
  
  const [ok, setOk] = useState(false);

  useEffect(() => { 
    //update every players settings ok for start
    setOk(data.playersSlots.every((player, index) => player.ok));
  }, [data] );

  useEffect(() => {
    //update end of round
    setData({
      ...data, endRound: isEndRound()
    });
  }, [data.current] );

  useEffect(() => {
    if(data.endRound){
      alert("end round")
    }

  }, [data.endRound] );

  const isEndRound = () => {
    return data.current != null && !(data.current in data.playersSlots);
  }

  const nextTurn = () => {
    return data.current + 1;
  }

  const handleRemovePlayer = (index) => {
    setData({...data, playersSlots: data.playersSlots.filter((player, j) => j !== index)});
  }

  const handleConfirmPlayer = (index, player) =>{
    setData(data => {
      const players = data.playersSlots.map((item, j) => {
        if (j === index) {
          return player;
        } else {
          return item;
        }
      });
 
      return {
        ...data, playersSlots: players
      };
    });
  };

  const handleAddPlayerSlot = () => {
    setData({...data, playersSlots: [...data.playersSlots, playerEmpty(false)] });
  }

  const handleCardSelect = (card) => {
    console.log(card)
    setData({...data, cardSelected: card, current: nextTurn()})
  }

  const handleStart = () => {
    setData({...data, start: true, current : 0});
  }

  const handleRestart = () => {
    setData(emptySession);
  }

  

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <ul className="list-group">
              {data.playersSlots.map((player, index) => {
                return player.ok && <li className="list-group-item" key={`playerOk-${index}`}><span>{player.name}</span></li>
              })}
              {data.playersSlots.map((player, index) => {
                return !data.start && !player.ok && <li className="list-group-item" key={`playerSlot-${index}`}>
                  <PlayerConfig index={index} data={player} onRemovePlayer={handleRemovePlayer} onConfirmPlayer={handleConfirmPlayer}/>
                  {!player.readonly && <><button onClick={() => handleRemovePlayer(index)}>Remove</button></>}
                </li>
              })}
              {(!data.start && ok) && <li className="list-group-item"><button onClick={handleAddPlayerSlot}>Add Player</button></li>}
              {(!data.start && ok) && <li className="list-group-item"><button onClick={handleStart}>Start</button></li>}
              {data.start && <li className="list-group-item"><button onClick={handleRestart}>Restart Game</button></li>}
            </ul>
          </div>
          <div className="col-10">
            <div className="row">
                {data.playersSlots.filter((player, index) => player.ok).map((player, index)  => <Player data={player} turn={index == data.current} /> )}
            </div>         
            <div className="row">
              { cards.map(card => <div className="col col-2" key={`slot_${card.name}`}><Slot card={card} onSelect={() => handleCardSelect(card)}/></div> ) } 
            </div>
          </div>
          {data.endRound && <div className="alert alert-success">End Round</div>}
        </div>
      </div>
    </>

  )
}
