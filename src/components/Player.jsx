import React, { useState } from 'react';
import { cards, emptyCard } from './Cards';
import { Choice } from './Choice';
import { Score } from './Score';
import { Slot } from './Slot';

export const USER_TYPE = {
  CPU: 0,
  HUMAN: 1
}

export const playerEmpty = (readonly) => {
  return {
    ok: false,
    name : "",
    victories : 0,
    score : 0,
    readonly : readonly,
    type: USER_TYPE.HUMAN,
    turn: false,
    choices: [],
    cardSelected: undefined,
    show: false,
  }
}

export const Player = (props) => {
  return (
    <div>
      <Score/>
      <span style={{fontWeight: props.turn ? "bold" : "normal"}}>{props.data.name}</span>
      <Choice card={props.data.cardSelected} show={props.data.show} />
    </div>
  )
}
