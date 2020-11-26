import React, { useState } from 'react';
import { cards, emptyCard } from './Cards';
import { Choice } from './Choice';
import { Score } from './Score';
import { Slot } from './Slot';

export const Player = (props) => {
  const[data, setData] = useState({
    cardSelected: emptyCard,
    show: false,
    turn: false,
  });

  const handleCardSelect = (card) => {
    console.log(card)
    setData({...data, cardSelected: card})

  }

  return (
    <>
      <Score/>
      <h3>{props.name}</h3>
      <Choice card={data.cardSelected} show={data.show} />
      <div className="row" >
        { cards.map(card => <Slot key={card.name} card={card}  onSelect={handleCardSelect}/> ) }
      </div>

    </>
  )
}
