import { useState } from "react";
import axios from 'axios';
import Submit from './Submit';
import Lottie from 'react-lottie-player'
import Popup from '../../hooks/Popup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function NewGoal(props) {

  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  //code for post request to the back end.
  const onSubmitForm = (name, target) => {
      axios.post("http://localhost:8080/api/plant-goals", { name, target })
      .then((response) => {
        setTimeout(() => {
          props.onClose()
        }, 1000);
        props.setGoals(prev => [...prev, response.data]);
      })
      .catch((err) => {
      console.error('this is an error tara', err.message);
      })
  };

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
          <h2>Create a New Plant Goal</h2>
        </header>
        <input
            name="name"
            type="text"
            placeholder={name}
            value={name}
            onChange = {(e) => setName(e.target.value)}
        />
        <input
            name="amount"
            type="number"
            placeholder={amount}
            value={amount}
            onChange = {(event) => setAmount(event.target.value)}
        />
      </form>
        <div className="buttons">
          <button id="save" onClick={() => onSubmitForm(name, amount)}>Submit</button>
        </div>
    </div>
    </div>
  )
}