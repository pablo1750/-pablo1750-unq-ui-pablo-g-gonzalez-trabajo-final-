import React, { useState } from 'react';
import { Card, coveredCard } from './Cards';
import { USER_TYPE } from './Player';

export const Slot = (props) => {
  //const [covered, setCovered] = useState(true);
  const handleSelectClick = () => {
    props.onSelect(props.card);
  }

  return (
      <button className="btn m-0 p-0" onClick={handleSelectClick} disabled={props.player.type == USER_TYPE.CPU}>
        {props.player.type == USER_TYPE.CPU &&
          <Card card={coveredCard} />
        }
        {props.player.type == USER_TYPE.HUMAN &&
          <Card card={props.card} />
        }
      </button>
  )
}