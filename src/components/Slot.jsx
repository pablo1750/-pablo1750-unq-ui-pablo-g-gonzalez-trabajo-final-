import React, { useState } from 'react';
import { Card } from './Cards';

export const Slot = (props) => {
  //const [covered, setCovered] = useState(true);

  const handleSelectClick = () => {
    props.onSelect(props.card);
  }

  return (
    <div className="card">
      <Card card={props.card} covered={false}/>
      <button className="btn btn-primary" onClick={handleSelectClick}>Select</button>
    </div>
  )
}