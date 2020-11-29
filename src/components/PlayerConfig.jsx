import React, { useState } from 'react';
import { PLAYER_STATUS, USER_TYPE } from './Player';

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

          <div class="input-group input-group-sm">
            <div className="input-group-prepend"><span className="input-group-text"> Player {props.index+1}</span></div>
            <input className="form-control" placeholder="Name" value={data.name} autofocus tabIndex="0" disabled={data.type == USER_TYPE.CPU} onChange={handleNameChange} required/>
            
            <div class="input-group-append">
              {data.type == USER_TYPE.CPU && <button type="button" className="btn btn-outline-secondary" onClick={handleHumanClick}>HUMAN</button>}
              {data.type == USER_TYPE.HUMAN && <button type="button" className="btn btn-outline-secondary" onClick={handleCpuClick}>CPU</button>}
              <button type="submit" className="btn btn-outline-success">Confirm</button>
          {!data.readonly && <button className="btn btn-outline-danger" onClick={() => props.onCancelPlayer(props.index)}>Cancel</button>}
            </div>
          </div>
            <div class="invalid-feedback">
              Please choose a name.
            </div>
        </form>

      }
    </>
  )

}