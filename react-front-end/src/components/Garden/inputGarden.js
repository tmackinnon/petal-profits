import React, { useEffect, useState } from 'react';
import lottieJson from '../../plant_animation.json'
import ProgressBar from "./progress-bar";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import buttonPulse from '../../button-pulse.json'
import Lottie from 'react-lottie-player'
import EditGarden from './editGarden';
import axios from 'axios';
import NewGoal from './newGoal';

const InputGarden = () => {
  const [goals, setGoals] = useState([])
  const [isEditOpen, setIsEditOpen] = useState({});
  const [isAddOpen, setIsAddOpen] = useState(false)

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
      <div key={item.id} className="carousel-slide">
        <header className='header'>
          <h3>{item.name}</h3>

          {!edit && (
            <button className= 'edit-button' onClick={() => toggleForm(item.id)}>
              <FontAwesomeIcon icon={faPenToSquare} style={{color: "#8fd0a5"}} />
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
        </header>

          <Lottie className='plant-img'
            animationData={lottieJson}
            play
            segments={[0, Math.round(tAmount/gAmount * 100)]}
            loop={false}
            style={{ width: 250, height: 250 }}
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
    <div className="carousel">
        {plantGoals}
        {!isAddOpen && (
          <div className="addNew">
            <Lottie 
              onClick={() => setIsAddOpen(true)}
              className='buttonPulse'
              loop
              animationData={buttonPulse}
              play
              style={{ width: 150, height: 150 }}
            />
          </div>
        )}
        {isAddOpen && (
          <NewGoal
            onClose={() => setIsAddOpen(false)}
            setGoals={setGoals}
            goals={goals}
          />
        )}
    </div>
)};


export default InputGarden
