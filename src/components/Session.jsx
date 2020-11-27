import React, { useEffect, useState } from 'react';
import { cards } from './Cards';
import { Player, playerEmpty } from './Player';
import { PlayerConfig } from './PlayerConfig';
import { Slot } from './Slot';

export const Session = (props) => {

  const [data, setData] = useState({
    playersSlots: [
      playerEmpty(true),
      playerEmpty(true),
    ],
    start: false,
    current: 0,
    
  })
  
  const [ok, setOk] = useState(false);


  useEffect(() => { 
    updateOk();
  }, [data] );

  const updateOk = () => {
    setOk(data.playersSlots.every((player, index) => player.ok)) ;
  }

  const nextTurn = () => {
    setData({...data, current: data.current + 1});
  }

  const handleRemovePlayer = (index) => {
    //console.log(event);
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
    //setData({...data, cardSelected: card})
  }

  const handleStart = () => {
    setData({...data, start: true});
  }
  
  const handleRestart = () => {
    
  }

  return (
    <>
      <div className="container">

        
        <div className="row">
          <div className="col-2">

            <ul class="list-group">

              {data.playersSlots.map((player, index) => {
                if(!player.ok){
                  return (
                    <>
                    {!data.start && <li class="list-group-item"><PlayerConfig key="player{index}" index={index} data={player} onRemovePlayer={handleRemovePlayer} onConfirmPlayer={handleConfirmPlayer}/></li> }
                    {!player.readonly && <><button onClick={() => handleRemovePlayer(index)}>Remove</button></>}

                    </>
                  ) 
                }else{
                  return <li class="list-group-item"><span key="player{index}">{player.name}</span></li>
                }
              })}
   

              {ok && !data.start && <li class="list-group-item"><button onClick={handleAddPlayerSlot}>Add Player</button></li>}
              {!data.start && ok && <li class="list-group-item"><button onClick={handleStart}>Start</button></li>}
              {data.start && <li class="list-group-item"><button onClick={handleRestart}>Restart Game</button></li>}

            </ul>
          </div>
          <div className="col-10">

            <div className="row">
              
                {data.playersSlots.filter((player, index) => player.ok).map((player, index)  => <Player data={player} /> )}
              
            </div>         
            <div className="row">
              { cards.map(card => <div className="col col-2"><Slot key={card.name} card={card} onSelect={handleCardSelect}/></div> ) } 
            </div>
          </div>
        </div>
      
      </div>
    </>

  )
}
