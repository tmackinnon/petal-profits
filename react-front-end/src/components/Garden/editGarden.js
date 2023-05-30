import React, { useState } from 'react';
import './submit.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'

const EditGarden = (props) => {

  const [name, setName] = useState(props.name);
  const [target, setTarget] = useState(props.amount)

  return (
    <div className="popup-box">
    <div className="edit-form">

      <div id='wrapper'>
        <div onClick={() => props.onClose()} id="close">
            <FontAwesomeIcon icon={faX} />
        </div>
      </div>

      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <header>
          <h2>Update Your Plant Goal</h2>
        </header>
        <input
            name="edit-name"
            type="text"
            placeholder={name}
            value={name}
            onChange = {(event) => setName(event.target.value)}
        />
        <input
            name="edit-amount"
            type="number"
            placeholder={target}
            value={target}
            onChange = {(event) => setTarget(event.target.value)}
        />
      </form>

      <div className="buttons">
        <button id="cancel" onClick={() => props.onClose()}>Cancel</button>
        <button id="save" onClick={() => props.onSubmit(props.id, {name, target})}>Save</button>
      </div>

    </div>
    </div>
  )
}

export default EditGarden;
