import React, { useState } from 'react';
import { playerEmpty, PLAYER_STATUS, USER_TYPE } from './Player';

export const PlayerConfig = (props) => {

  const [data, setData ] = useState(props.data)
  const [error, setError ] = useState(false)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(data.name == ""){
      setError(true);
      return;
    }
    playerConfirm();
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
  
  const playerConfirm = () => {
    props.onConfirmPlayer(props.index, {...data, victories: 0, score: 0, ok: true, status: PLAYER_STATUS.PLAYING, cardSelected: undefined});
  }

  return (
    <>
      {
        <form className={`${error && "was-validated"}`} onSubmit={handleSubmit} noValidate>

          <div class="form-group m-1">
            <label for="name">Player {props.index}</label>
            <input className="form-control" id="name" placeholder="Name" value={data.name} disabled={data.type == USER_TYPE.CPU} onChange={handleNameChange} required/>
            <div class="invalid-feedback">
              Please choose a name.
            </div>
          </div>

          <button type="submit" className="btn btn-primary m-1">Confirm</button>
          {data.type == USER_TYPE.CPU && <button className="btn btn-secondary m-1" onClick={handleHumanClick}>HUMAN</button>}
          {data.type == USER_TYPE.HUMAN && <button className="btn btn-secondary m-1" onClick={handleCpuClick}>CPU</button>}
          
        </form>

      }
    </>
  )

}