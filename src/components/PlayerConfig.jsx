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

  const handleTypeToggleClick = (event) => {

    if(data.type == USER_TYPE.CPU){
      handleHumanClick();
    }
    if(data.type == USER_TYPE.HUMAN){
      handleCpuClick();
    }

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
      <form className="was-validated h-100" onSubmit={handleSubmit} noValidate  style={{textAlign: "left"}}>
        <div class="form-row">
          <div class="col-md-8">
              <label for={`player${data.index}-name`}>Player {data.index}</label>
              <input id={`player${data.index}-name`} className="form-control form-control-sm" placeholder="Name" value={data.name} autoFocus={props.autoFocus} disabled={data.type === USER_TYPE.CPU} onChange={handleNameChange} required maxLength={30}/>
              {error &&  
                <div className="invalid-feedback"> 
                    {error}
                </div>
              }
          </div>
          <div class="col-md-4">
            <label style={{color:"transparent"}}>Type</label>
            <div class="custom-control custom-switch">
              <input id={`player${data.index}-type`} type="checkbox" class="custom-control-input" onClick={handleTypeToggleClick}/>
              <label class="custom-control-label" for={`player${data.index}-type`}>CPU</label>  
            </div>    
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-12 mt-3">
              {!data.readonly && <button className="btn btn-outline-danger m-1" onClick={() => props.onCancelPlayer()}>Cancel</button>}
              <button type="submit" className="btn btn-success m-1">Confirm</button>
          </div>
        </div>


      </form>
    </>
  )

}