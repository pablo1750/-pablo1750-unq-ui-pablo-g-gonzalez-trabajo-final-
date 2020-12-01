import React, { useState } from 'react';
import { USER_TYPE } from './Player';

export const PlayerConfig = (props) => {

  const [data, setData ] = useState(props.data)
  const [error, setError ] = useState("")
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(data.name === ""){
      setError("Name is required.");
      return;
    }
    props.onConfirmPlayer({...data, ok: true});
  }
  
  const handleNameChange = (event) => {
    setError("");
    setData({...data, name: event.target.value});
  }

  const handleCpuClick = (event) => {
    setError("");
    setData({...data, name: "CPU", type: USER_TYPE.CPU});
  }
  
  const handleHumanClick = (event) => {
    setError("");
    setData({...data, name: "", type: USER_TYPE.HUMAN});
  }
  

  return (
    <>
      <form className={`${error && "was-validated"} h-100`} onSubmit={handleSubmit} noValidate>
        <div className="input-group input-group-sm">

          <div className="input-group-prepend">
            <span className="input-group-text">Player {data.index}</span>
          </div>
          
          <input className="form-control" placeholder="Name" value={data.name} autoFocus={data.index!=2} disabled={data.type == USER_TYPE.CPU} onChange={handleNameChange} required maxLength={30}/>
          
          <div className="input-group-append">
            {data.type == USER_TYPE.CPU && <button type="button" className="btn btn-outline-secondary" onClick={handleHumanClick}>HUMAN</button>}
            {data.type == USER_TYPE.HUMAN && <button type="button" className="btn btn-outline-secondary" onClick={handleCpuClick}>CPU</button>}
            <button type="submit" className="btn btn-outline-success">Confirm</button>
            {!data.readonly && <button className="btn btn-outline-danger" onClick={() => props.onCancelPlayer()}>Cancel</button>}
          </div>
          
        </div>
        {error &&  
          <div className="input-group input-group-sm"> 
            <div className="alert alert-danger p-1 w-100">
              {error}
            </div>
          </div>
        }
      </form>
    </>
  )

}