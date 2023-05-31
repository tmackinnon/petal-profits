import React, { useEffect, useState } from 'react';
import lottieJson from '../../plant_animation.json'
import ProgressBar from "./progress-bar";
import 'font-awesome/css/font-awesome.min.css';
import Lottie from 'react-lottie-player'
import EditGarden from './editGarden';
import axios from 'axios';

const InputGarden = () => {
  const [goals, setGoals] = useState([])
  const [isEditOpen, setIsEditOpen] = useState({});

  useEffect(() =>{
    axios.get('http://localhost:8080/api/plant-goals')
      .then((response) => {
        console.log('response.data', response.data)
        setGoals(prev => [...prev, ...response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function toggleForm(plantGoalId) {
    setIsEditOpen(prev => ({
      ...prev,
      [plantGoalId]: !prev[plantGoalId],
    }));
  }

  function updateGoal(goalId, {name, target}) {
    // recreate goals with new info
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, name, target_amount: target };
      }
      return goal;
    });
     //update categoryGoals state to reflect new value
    return axios.put(`http://localhost:8080/api/plant-goals/${goalId}`, {name, target})
      .then(() => {
        setGoals(updatedGoals);
        toggleForm(goalId);
      })
      .catch(error => console.log(error))
    }


  const plantGoals = goals.map((item) => {

    const edit = isEditOpen[item.id] || false;
    const tAmount = Number(item.tracked_amount)
    const gAmount = Number(item.target_amount)

    return (
      <div key={item.id} className='plantgoal'>
          <h3 className='header'>{item.name}</h3>

          {!edit && (
            <button className= 'button' onClick={() => toggleForm(item.id)}>
              Edit
            </button>
          )}
          {edit && (
            <EditGarden
              name={item.name}
              amount={item.target_amount}
              onClose={() => toggleForm(item.id)}
              onSubmit={updateGoal}
              id={item.id}
            />
          )}

          <Lottie className='plant-img'
            animationData={lottieJson}
            play
            segments={[0, Math.round(tAmount/gAmount * 100)]}
            loop={false}
            style={{ width: 300, height: 300 }}
          />
          <footer>
            <ProgressBar  bgcolor={'#05648A'} completed={Math.round(tAmount/gAmount * 100)} />
            <div className='amounts'>
              <p className='tAmount'>${tAmount.toLocaleString()}</p>
              <p className='gAmount'>${gAmount.toLocaleString()}</p>
            </div>
            </footer>
      </div>
    );
  })

  return(
    <div className="carousel-slide">
        {plantGoals}
    </div>
)};


export default InputGarden
