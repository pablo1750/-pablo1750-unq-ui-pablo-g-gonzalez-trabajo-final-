import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PlayersContext, { nextRoundPlayersUpdate, roundResultPlayersUpdate, selectCard } from '../providers/PlayersContext';
import { cardBeatTo, cards, coveredCard } from './Cards';
import { Player, PLAYER_STATUS } from './Player';
import { Slot } from './Slot';

const ROUND_STATE = {
  START: 0,
  PLAYER_READY: 1,
  END_ROUND: 2,
  SHOW_CARDS: 3,
  SHOW_RESULTS: 4
}

const emptyBoard = () => { return {
  current: 0,
  state: ROUND_STATE.START,
  roundHasWinner: false,
}}

//funcion extraida de developer.mozilla.org
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;


export const Board = (props) => {
  
  const [data, setData] = useState({...emptyBoard()} );
  const [players, setPlayers] = useContext(PlayersContext);

  useEffect(() => {

    //update end of round (si todos los jugadores en estado PLAYING tienen carta seleccionada)
    if(data.state === ROUND_STATE.START && players.filter(player => player.status === PLAYER_STATUS.PLAYING).every(player => !!player.cardSelected)){
      setData({
        ...data, 
        state : ROUND_STATE.END_ROUND,
      });
      autoShowCards();
    }

  }, [data.current] );

  const nextTurn = () => {
    return data.current + 1;
  }
  
  const handleCardSelect = (card) => {
    selectCard(setPlayers, data.current, card);
    setData({
      ...data, 
      current: nextTurn(),
      state: ROUND_STATE.START
    });
  }
  
  const handleRandomCardSelect = () => {
    handleCardSelect(cards[getRandomInt(0, cards.length)])
  }

  const handleCoveredCardSelect = () => {
    handleCardSelect(coveredCard);
  }

  const handleShowCards = () => {
    setData({...data, state: ROUND_STATE.SHOW_CARDS});
    setTimeout(()=>{handleShowResults()}, 1000)
  }

  const handleShowResults = () => {
    const cardsSelected = players
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
    const hasWinner = scores.filter(s => s.value === maxScore).length === 1 &&  scores.filter(s => s.value === maxScore)[0].count === 1 ;
    const winnersStatus = hasWinner ? PLAYER_STATUS.ROUND_WINNER : PLAYER_STATUS.ROUND_TIED;
    setData({
      ...data, 
      state: ROUND_STATE.SHOW_RESULTS,
      roundHasWinner: hasWinner,
      current: null,
    });

    roundResultPlayersUpdate(setPlayers, scores, maxScore, hasWinner, winnersStatus);

  }

 
  const handleNextRound = () => {
    setData({
      ...data, 
      roundHasWinner: false,
      state: ROUND_STATE.START,
      current: 0,
    });
    nextRoundPlayersUpdate(setPlayers, data.roundHasWinner);
  }

  const handlePlayerReady = () => {
    setData({...data, state: ROUND_STATE.PLAYER_READY});
  }

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
          {data.state === ROUND_STATE.END_ROUND && <button className="btn btn-info m-1" onClick={handleShowCards}>Show Cards</button>}
          {data.state === ROUND_STATE.SHOW_RESULTS && data.roundHasWinner && <button className="btn btn-success m-1" onClick={handleNextRound}>Next Round</button>}
          {data.state === ROUND_STATE.SHOW_RESULTS && !data.roundHasWinner && <button className="btn btn-warning m-1" onClick={handleNextRound}>Tie-breaker</button>}
        </div>   
      </div>
      <div className="row d-flex justify-content-center">
        {players.map((player, index) => 
          <div key={`player-${player.index}`} className="col-6 col-md-4 col-lg-2 mb-3">
            <Player data={player} onCoveredCardSelect={handleCoveredCardSelect} onRandomCardSelect={handleRandomCardSelect} onReady={handlePlayerReady} turn={index === data.current} show={data.state >= ROUND_STATE.SHOW_CARDS} />
          </div>
        )}  
      </div>
      <div className={`container fixed-bottom overflow-auto ${data.state === ROUND_STATE.PLAYER_READY && "w3-animate-bottom"}`}>
        {data.state === ROUND_STATE.PLAYER_READY &&
          <div className="row">
            {cards.map(card => 
              <div className="col m-0 p-0" key={`card_slot-${card.name}`}>
                <Slot card={card} onSelect={() => handleCardSelect(card)} player={players[data.current]}/>
              </div> 
            )} 
          </div>
        }
      </div>
    </>
  )
}
