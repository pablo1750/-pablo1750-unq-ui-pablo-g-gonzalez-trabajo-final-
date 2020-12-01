import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { cardBeatTo, cards, coveredCard } from './Cards';
import { Player, PLAYER_STATUS, USER_TYPE } from './Player';
import { SESSION_STATE } from './Session';
import { Slot } from './Slot';


export const emptyBoard = () => { return {
  players: [],
  current: 0,
  state: SESSION_STATE.START,
  roundHasWinner: false,
}}


export const Board = (props) => {
  
  const [data, setData] = useState({...emptyBoard(), players: props.players} );



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

    //si el usuario actual es la maquina, 
    //dejo un tiempo de espera entre medio segundo y dos segundos para que parezca que la cpu esta pensando antes de decidir
    if( data.current in data.players && data.players[data.current].type === USER_TYPE.CPU) {
      handlePlayerReady();
      setTimeout(() => {
        handleCardSelect(cards[getRandomInt(0,5)]);;
      }, getRandomInt(500,2000));
    }
  }, [data.current] );

  const nextTurn = () => {
    return data.current + 1;
  }

  
  const handleCardSelect = (card) => {
    setData({
      ...data, 
      players: data.players.map((item, j) => {
        return (j === data.current) ? {...item, cardSelected: card} : item;
      }),
      current: nextTurn(),
      state: SESSION_STATE.START
    });

    console.log(data)
  }


  
  const handleShowCards = () => {
    setData({...data, state: SESSION_STATE.SHOW_CARDS});
    setTimeout(()=>{handleShowResults()}, 1000)
  }

  const handleShowResults = () => {


    const cardsSelected = data.players
      .filter(player => player.status === PLAYER_STATUS.PLAYING)
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

 
  const handleNextRound = () => {
    setData({
      ...data, 
      roundHasWinner: false,
      state: SESSION_STATE.START,
      current: 0,
      players: data.players.map(player => {
        return {
          ...player, 
          //deselecciono la carta
          cardSelected: !data.roundHasWinner && player.status === PLAYER_STATUS.ROUND_LOST ? coveredCard : undefined, 
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
    setData({...data, state: SESSION_STATE.PLAYER_READY});
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


      <div className="row" style={{minHeight: "55px"}}>
        <div className="col col-12 mh-100">
          <button className="btn btn-danger m-1" onClick={() => {props.onExitBoard(data.players)}}>Exit</button>
          {data.state == SESSION_STATE.END_ROUND && <button className="btn btn-info m-1" onClick={handleShowCards}>Show Cards</button>}
          {data.state == SESSION_STATE.SHOW_RESULTS && data.roundHasWinner && <button className="btn btn-success m-1" onClick={handleNextRound}>Next Round</button>}
          {data.state == SESSION_STATE.SHOW_RESULTS && !data.roundHasWinner && <button className="btn btn-warning m-1" onClick={handleNextRound}>Tie-breaker</button>}
        </div>   
      </div>
      <div className="row d-flex justify-content-center">
        {data.players.map((player, index) => 
          <div className="col-6 col-md-4 col-lg-2 mb-3">
            <Player key={`playerBoard-${player.index}`} data={player} onReady={handlePlayerReady} turn={index == data.current} show={data.state >= SESSION_STATE.SHOW_CARDS} />
          </div>
        )}  
      </div>

      <div className={`container fixed-bottom overflow-auto ${data.state === SESSION_STATE.PLAYER_READY && "w3-animate-bottom"}`}>
        {data.state === SESSION_STATE.PLAYER_READY &&

          <div className="row">
            {cards.map(card => 
              <div className="col m-0 p-0" key={`slot_${card.name}`}>
                <Slot card={card} onSelect={() => handleCardSelect(card)} player={data.players[data.current]}/>
              </div> 
            )} 
          </div>

        }
      </div>

    </>
  )
}
