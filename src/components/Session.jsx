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
    start: false,
    current: null,
    endRound: false,
    state: SESSION_STATE.CONFIG,
    roundHasWinner: false,
  }

export const Session = (props) => {

  const [data, setData] = useState(emptySession);
  
  const [ok, setOk] = useState(false);

  useEffect(() => { 
    //update every players settings ok for start
    setOk(data.playersSlots.every((player, index) => player.ok));
  }, [data.playersSlots] );

  useEffect(() => {

    //update end of round (si todos los jugadores en estado PLAYING tienen carta seleccionada)
    if(data.playersSlots.filter(player => player.status === PLAYER_STATUS.PLAYING).every(player => !!player.cardSelected)){
      setData({
        ...data, 
        state : SESSION_STATE.END_ROUND
      });
      autoShowCards();
    }

    //si el usuario actual no esta jugando porque perdio le pongo una carga cubierta
    if( data.current in data.playersSlots && data.playersSlots[data.current].status === PLAYER_STATUS.ROUND_LOST) {
      handlePlayerReady();
      setTimeout(() => {
        handleCardSelect(coveredCard);;
      }, 10);
      return;
    }

    //si el usuario actual es la maquina, dejo un tiempo de espera para que parezca que la cpu esta pensando antes de decidir
    if( data.current in data.playersSlots && data.playersSlots[data.current].type === USER_TYPE.CPU) {
      handlePlayerReady();
      setTimeout(() => {
        handleCardSelect(cards[getRandomInt(0,5)]);;
      }, 500);
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


    const cardsSelected = data.playersSlots
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
      playersSlots: data.playersSlots.map((player) => {
        if(player.status !== PLAYER_STATUS.PLAYING){
          return player;
        }else{
          const score = scores.find(s => s.name === player.cardSelected.name).value
          console.log({cardsSelected: cardsSelected, scores: scores, maxScore: maxScore, hasWinner: hasWinner, winnersStatus: winnersStatus, player: player, score: score});
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
      playersSlots: data.playersSlots.map(item => ({...item, cardSelected: undefined})) 
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
      timer: 1500,
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
              <li className="list-group-item">
                {ok && <button className="btn btn-primary" onClick={handleAddPlayerSlot}>Add Player</button>}
                {ok && <button className="btn btn-primary" onClick={handleStart}>Start</button>}
                <button className="btn btn-primary" onClick={handleRestart}>Restart Game</button>
              </li>
            </ul>
          </div>
        }

        {data.state >= SESSION_STATE.START &&

          <div className="container overflow-auto">
            <div className="row">
              <div className="col col-12">
                <button className="btn btn-danger m-1" onClick={handleExitBoard}>Exit board</button>
                {data.state == SESSION_STATE.END_ROUND && <button className="btn btn-info m-1" onClick={handleShowCards}>Show Cards</button>}
                {data.state == SESSION_STATE.SHOW_RESULTS && <button className="btn btn-success m-1" onClick={handleNextRound}>Next Round</button>}
              </div>   

              {data.playersSlots.map((player, index) => player.ok && 
                <div className="col-6 col-md-4 col-lg-2">
                <Player key={`playerSession-${index}`} data={player} onReady={handlePlayerReady} turn={index == data.current} show={data.state >= SESSION_STATE.SHOW_CARDS} />
                </div>
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
