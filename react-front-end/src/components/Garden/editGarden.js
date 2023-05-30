import React, { useState } from 'react';
import Submit from './Submit';
import './submit.scss';
import axios from 'axios';


const EditGarden = (props) => {
  const [name, newName] = useState(props.name);
  const [target, newTarget] = useState(props.amount)

  function updateGoal(goalId, body) {
    // recreate categoryGoals with new amnt
    // let categoryGoalId = 0;
    // const updatedGoals = categoryGoals.map((goal) => {
    //   if (goal.category_id === categoryId) {
    //     categoryGoalId = goal.id;
    //     return { ...goal, amount };
    //   }
    //   return goal;
    // });
     //update categoryGoals state to reflect new value
    return axios.put(`http://localhost:8080/api/plant-goals/${goalId}`, {name, target})
      .then(() => {
        // setCategoryGoals(updatedGoals);
        props.onClose()
      })
      .catch(error => console.log(error))
    }




  return (
    <>
      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <div className="modalContainer" id={`id$(goals.id)`}>
          <h1 className='popupHeader'>EDIT</h1>
          <span onClick={props.onClose} className='closeBtn' >X</span>
          <span className='input'>
          <input type='text' value={name} onChange = {(event) => newName(event.target.value)}></input>
          </span>
          <p></p>
          <span className='input'>
          <input type='number' value={target} onChange={(event) => newTarget(event.target.value)}></input>
          </span>
          <div className=''>
            <button className='outerBTN'
              data-target={`id$(goals.id)`}
              onClick={() => updateGoal(props.id)}
            >
              <Submit />
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditGarden;
