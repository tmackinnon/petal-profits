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

  function toggleForm(plantGoalId) {
    setIsEditOpen(prev => ({
      ...prev,
      [plantGoalId]: !prev[plantGoalId],
    }));
  }

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


  const plantGoals = goals.map((item) => {

    const edit = isEditOpen[item.id] || false;
    const tAmount = Number(item.tracked_amount)
    const gAmount = Number(item.target_amount)

    return (
      <li key={item.id}>
          <div className='goalName'>
            <h3>{item.name}</h3>
          </div>

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
          <div className="progressBar" >
            <ProgressBar  bgcolor={'#05648A'} completed={Math.round(tAmount/gAmount * 100)} />
          </div>
          <div className='amounts'>
            <p className='tAmount'>${tAmount.toLocaleString()}</p>
            <p className='gAmount'>${gAmount.toLocaleString()}</p>
          </div>
      </li>
    );
  })

  return(
  <ul>
    {plantGoals}
  </ul>
)};


export default InputGarden
