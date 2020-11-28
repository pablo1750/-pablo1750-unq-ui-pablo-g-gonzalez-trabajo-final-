import React from 'react';
import { Card, coveredCard, emptyCard } from './Cards';

export const Choice = (props) => {
  return (
    <div style={{width: "100%"}}>
    {props.card && !props.show &&
      <Card card={coveredCard} width="100px"/>
    }
    {props.card && props.show &&
      <Card card={props.card} width="100px"/>
    }
    {!props.card && 
      <Card card={emptyCard} width="100px"/>
    }
    </div>
  )
}
