import React, { useState } from 'react';
import { playerEmpty, USER_TYPE } from './Player';

export const PlayerConfig = (props) => {

  const [data, setData ] = useState(props.data)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onConfirmPlayer(props.index, {...data, victories: 0, score: 0, ok: true});
  }
  
  const handleNameChange = (event) => {
    setData({...data, name: event.target.value});

  }

  const handleCpuClick = (event) => {
    setData({...data, name: "CPU", type: USER_TYPE.CPU});
  }
  
  const handleHumanClick = (event) => {
    setData({...data, name: "", type: USER_TYPE.HUMAN});
  }
  
  return (
    <>
      {
        <form onSubmit={handleSubmit}>
        <label>Player {props.index}</label>
        
        <input value={data.name} disabled={data.type == USER_TYPE.CPU} onChange={handleNameChange}/>
        
        {data.type == USER_TYPE.CPU && <button onClick={handleHumanClick}>HUMAN</button>}
        {data.type == USER_TYPE.HUMAN && <button onClick={handleCpuClick}>CPU</button>}
        
        <button type="submit">Ok</button>
        </form>

      }
    </>
  )

}