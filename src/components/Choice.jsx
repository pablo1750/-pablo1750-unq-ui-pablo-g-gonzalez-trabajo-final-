import React from 'react';
import { Card } from './Cards';

export const Choice = (props) => {
  return (
    <>
    {props.card && 
      <Card card={props.card} covered={!props.show}/>
    }
    </>
  )
}
