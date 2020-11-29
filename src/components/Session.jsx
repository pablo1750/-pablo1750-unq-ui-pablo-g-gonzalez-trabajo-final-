import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { cardBeatTo, cards, coveredCard, emptyCard } from './Cards';
import { Player, playerEmpty, PLAYER_STATUS, USER_TYPE } from './Player';
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
    players: [],
    start: false,
    current: null,
    state: SESSION_STATE.CONFIG,
    roundHasWinner: false,
    playersCounter: 0
  }

export const Session = (props) => {

  const [data, setData] = useState(emptySession);
  const [ok, setOk] = useState(false);

  useEffect(() => { 
    //update every players settings ok for start
    setOk(data.playersSlots.length === 0);
  }, [data.playersSlots] );

  useEffect(() => {

    //update end of round (si todos los jugadores en estado PLAYING tienen carta seleccionada)
    if(data.players.length > 0 && data.players.filter(player => player.status === PLAYER_STATUS.PLAYING).every(player => !!player.cardSelected)){
      setData({
        ...data, 
        state : SESSION_STATE.END_ROUND
      });
      autoShowCards();
    }

    //si el usuario actual no esta jugando porque perdio le pongo una carga cubierta
    if( data.current in data.players && data.players[data.current].status === PLAYER_STATUS.ROUND_LOST) {
      handleCardSelect(coveredCard);
      return;
    }

    //si el usuario actual es la maquina, dejo un tiempo de espera para que parezca que la cpu esta pensando antes de decidir
    if( data.current in data.players && data.players[data.current].type === USER_TYPE.CPU) {
      handlePlayerReady();
      setTimeout(() => {
        handleCardSelect(cards[getRandomInt(0,5)]);;
      }, 500);
    }
  }, [data.current] );

  const nextTurn = () => {
    return data.current + 1;
  }

  const handleRemovePlayer = (player) => {
    setData({...data, players: data.players.filter(item => item !== player)});
  }

  const handleRemovePlayerSlot = (slot) => {
    setData({...data, playersSlots: data.playersSlots.filter(item => item !== slot)});
  }

  /*
  const handleConfirmPlayer = (index, player) =>{
    setData({
      ...data, 
      playersSlots: data.playersSlots.map((item, j) => {
        return (j === index) ? player : item;
      }),
      playersCounter: data.playersCounter++
    });
  };
  */

  const handleConfirmPlayer = (slotIndex, player) =>{
    setData({
      ...data, 
      players: [
        ...data.players, 
        {...player, index: data.playersCounter}
      ],
      playersCounter: data.playersCounter + 1,
      playersSlots: data.playersSlots.filter((item, index) => index !== slotIndex)
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

    console.log(data)
  }

  const handleStart = () => {
    setData({...data, state: SESSION_STATE.START, current : 0});
  }

  const handleShowCards = () => {
    setData({...data, state: SESSION_STATE.SHOW_CARDS});
    setTimeout(()=>{handleShowResults()}, 1000)
  }

  const handleShowResults = () => {


    const cardsSelected = data.players
      .filter(player => player.status == PLAYER_STATUS.PLAYING)
      .map(player => player.cardSelected);

      //este filtro es para eliminar duplicados
    const cardsSelectedUniques = cardsSelected.filter((v, i, a) => a.indexOf(v) === i);

    const scores = cardsSelectedUniques.map(card1 => {
      return {
        name: card1.name,
        value: cardsSelected.filter(card2 => cardBeatTo(card1, card2)).length,
        count: cardsSelected.filter(card2 => card1.name === card2.name).length,
      }
    });
    const maxScore = Math.max.apply(null, scores.map(score => {return score.value} ));
    const hasWinner = scores.filter(s => s.value == maxScore).length == 1 &&  scores.filter(s => s.value == maxScore)[0].count == 1 ;
    const winnersStatus = hasWinner ? PLAYER_STATUS.ROUND_WINNER : PLAYER_STATUS.ROUND_TIED;

    setData({
      ...data, 
      state: SESSION_STATE.SHOW_RESULTS,
      roundHasWinner: hasWinner,
      players: data.players.map((player) => {
        if(player.status !== PLAYER_STATUS.PLAYING){
          return player;
        }else{
          const score = scores.find(s => s.name === player.cardSelected.name).value
          //console.log({cardsSelected: cardsSelected, scores: scores, maxScore: maxScore, hasWinner: hasWinner, winnersStatus: winnersStatus, player: player, score: score});
          return {
            ...player, 
            score: score,
            status: score == maxScore ? winnersStatus : PLAYER_STATUS.ROUND_LOST,
            victories: score == maxScore && hasWinner ? player.victories + 1 : player.victories,
          };
        }
      })

    });
  
  }

  
  const handleRestart = () => {
    setData(emptySession);
  }

  const handleExitBoard = () => {
    setData({
      ...data, 
      state: SESSION_STATE.CONFIG,
      current: null,
      playersSlots: data.playersSlots.map(player => ({
        ...player, 
        //deselecciono la carta
        cardSelected: undefined, 
        //reinicio el score
        score: 0, 
        //si no hubo ganador y est jugador perdio, no juega la siguiente ronda
        status: !data.roundHasWinner && player.status === PLAYER_STATUS.ROUND_LOST ? player.status : PLAYER_STATUS.PLAYING,
      })) 
    });
  }  
  
  const handleNextRound = () => {
    setData({
      ...data, 
      roundHasWinner: false,
      state: SESSION_STATE.START,
      current: 0,
      playersSlots: data.playersSlots.map(player => {
        return {
          ...player, 
          //deselecciono la carta
          cardSelected: undefined, 
          //reinicio el score
          score: 0, 
          //si no hubo ganador y est jugador perdio, no juega la siguiente ronda
          status: !data.roundHasWinner && player.status === PLAYER_STATUS.ROUND_LOST ? player.status : PLAYER_STATUS.PLAYING,
        }
      }

      ) 
    });
  }

  const handlePlayerReady = () => {
    //el usuario dice que esta listo, pero si es cpu tengo que elegir yo la carta::
    //if(data.playersSlots[data.current].type === USER_TYPE.HUMAN){
      setData({...data, state: SESSION_STATE.PLAYER_READY});
    //}
  }

  //funcion extraida de developer.mozilla.org
  //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const autoShowCards = () => {
    
    Swal.fire({
      title: 'RPSLS!',
      html: 'All players have chosen.',
      timer: 500,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        handleShowResults()
      }
    }).then((result) => {

    })
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

                    {data.players.map(player => 
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={`playerOk-${player.index}`}>
                        {player.name}
                        <span class="badge badge-secondary badge-pill">{player.victories}</span>
                      </li>
                    )}

                    {data.playersSlots.map((playerSlot, index) => 
                      <li className="list-group-item" key={`playerSlot-${index}`}>
                        <PlayerConfig data={playerSlot} slotIndex={index} onConfirmPlayer={handleConfirmPlayer} onCancelPlayer={handleRemovePlayerSlot}/>
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
            <>
              <div className="row" style={{minHeight: "55px"}}>
                <div className="col col-12 mh-100">
                  <button className="btn btn-danger m-1" onClick={handleExitBoard}>Exit</button>
                  {data.state == SESSION_STATE.END_ROUND && <button className="btn btn-info m-1" onClick={handleShowCards}>Show Cards</button>}
                  {data.state == SESSION_STATE.SHOW_RESULTS && data.roundHasWinner && <button className="btn btn-success m-1" onClick={handleNextRound}>Next Round</button>}
                  {data.state == SESSION_STATE.SHOW_RESULTS && !data.roundHasWinner && <button className="btn btn-warning m-1" onClick={handleNextRound}>Tie-breaker</button>}
                </div>   
              </div>
              <div className="row">
                {data.players.map((player, index) => player.ok && player.status != PLAYER_STATUS.ROUND_LOST &&
                  <div className="col-6 col-md-4 col-lg-2 mb-3">
                    <Player key={`playerSession-${index}`} data={player} onReady={handlePlayerReady} turn={index == data.current} readyCountDown={data.playerReadyCountDown} show={data.state >= SESSION_STATE.SHOW_CARDS} />
                  </div>
                )}  
              </div>
            </>
            
          }
        </div>

        <div className={`container fixed-bottom overflow-auto ${data.state === SESSION_STATE.PLAYER_READY && "w3-animate-bottom"}`}>
          {data.state === SESSION_STATE.PLAYER_READY &&

            <div className="row">
              {cards.map(card => 
                <div className="col m-0 p-0" key={`slot_${card.name}`}>
                  <Slot card={card} onSelect={() => handleCardSelect(card)} player={data.playersSlots[data.current]}/>
                </div> 
              )} 
            </div>

          }
        </div>
        
    </>

  )
}
