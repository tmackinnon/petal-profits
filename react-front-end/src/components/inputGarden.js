import React, { useEffect, useState } from 'react';
import lottieJson from '../plant_animation.json'
import ProgressBar from "./progress-bar";
import 'font-awesome/css/font-awesome.min.css';
import Lottie from 'react-lottie-player'
import EditGarden from './editGarden';

const InputGarden = () => {
  const [openModal, setOpenModal] = useState(false)
  const [goals, setGoals] = useState([])
  const [goal, setGoal] = useState({})

  const getGoal = async () => {
    try {
      const response = await fetch ('/garden')
      const jsonData = await response.json();

      setGoals(jsonData)
      } catch (err) {
      console.error(err.message);
    }
  }
  
 const handleSetGoal = (goal) => {
    setGoal(goal) 
    setOpenModal(true)
  }

  useEffect(() =>{
    getGoal();
  }, []);

console.log(goals)
  return(
  <>
    <div className='plant'>
          {openModal &&
          <EditGarden open={openModal} onClose={()=> setOpenModal(false)} goal={goal} />}
      {goals.map((item, idx) => (<>
        <div className='goalName'>
          {item.name}
        </div>
        <span className='edits' onClick={() => handleSetGoal(item)}  >
          <button>edit</button>
        </span>
        
        <Lottie className='plant-img'
          animationData={lottieJson}
          play
          segments={[0, Math.round(item.tracked_amount/item.target_amount * 100)]}
          loop={false}
          style={{ width: 150, height: 150 }}
        />
        <div className="progressBar">
          <ProgressBar key={idx} bgcolor={'#6a1b9a'} completed={Math.round(item.tracked_amount/item.target_amount * 100)} />
        </div>
        <div className='amounts'>
          <div className='tAmount'>
            ${item.tracked_amount}
          </div>
          <div className='gAmount'>
          ${item.target_amount}
          <br>
          </br>
          <br>
          </br>
          </div>
        </div>
      </>))}
    </div>
  </>
)};


export default InputGarden