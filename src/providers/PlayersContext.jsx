import React from "react";
import { coveredCard } from "../components/Cards";
import { PLAYER_STATUS } from "../components/Player";

// (A)

const removePlayer = (setter, index) => setter((players) => (players.filter(item => item.index !== index)) ) ;
const addPlayer = (setter, player) => setter((players) => ([...players, player]));
const clearPlayers = (setter) => setter([]);
const exitPlayers = (setter) => ( setter( (players) => (players.map(player => ({
    ...player, 
    //deselecciono la carta
    cardSelected: undefined, 
    //reinicio el score
    score: 0, 
    //si no hubo ganador y est jugador perdio, no juega la siguiente ronda
    status: PLAYER_STATUS.PLAYING,
  })))));

const selectCard = (setter, index, card) => setter(players =>
  players.map((item, j) => {
    return (j === index) ? {...item, cardSelected: card} : item;
  })
)

const roundResultPlayersUpdate = (setter, scores, maxScore, hasWinner, winnersStatus ) => setter(players => 
  players.map((player) => {
    if(player.status !== PLAYER_STATUS.PLAYING){
      return player;
    }else{
      const score = scores.find(s => s.name === player.cardSelected.name).value
      return {
        ...player, 
        score: score,
        status: score == maxScore ? winnersStatus : PLAYER_STATUS.ROUND_LOST,
        victories: score == maxScore && hasWinner ? player.victories + 1 : player.victories,
      };
    }
  })
)

const nextRoundPlayersUpdate = (setter, roundHasWinner) => setter(players =>
  players.map(player => {
    return {
      ...player, 
      //deselecciono la carta
      cardSelected: !roundHasWinner && player.status === PLAYER_STATUS.ROUND_LOST ? coveredCard : undefined, 
      //reinicio el score
      score: 0, 
      //si no hubo ganador y est jugador perdio, no juega la siguiente ronda
      status: !roundHasWinner && player.status === PLAYER_STATUS.ROUND_LOST ? player.status : PLAYER_STATUS.PLAYING,
    }
  })
)

const nextPlayerIndex = (players) => (Math.max.apply(null, players.map(player => {return player.index} )) | 0) + 1;
// (B)
const PlayersContext = React.createContext(null); 

// (C)
export { addPlayer, removePlayer, clearPlayers, exitPlayers, selectCard, roundResultPlayersUpdate, nextRoundPlayersUpdate, nextPlayerIndex};
export default PlayersContext;