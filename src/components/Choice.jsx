import React from 'react';
import { Card, coveredCard, emptyCard } from './Cards';

export const Choice = (props) => {
  return (
    <div style={{width: "100%"}}>
    {props.card && !props.show &&
      <Card card={coveredCard}/>
    }
    {props.card && props.show &&
      <Card card={props.card}/>
    }
    {!props.card && 
      <Card card={emptyCard}/>
    }
    </div>
  )
}
