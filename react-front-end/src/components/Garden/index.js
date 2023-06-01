import Lottie from 'react-lottie-player'
import buttonPulse from '../../button-pulse.json'
import Popup from '../../hooks/Popup';
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Submit from './Submit';
import axios from 'axios';
import './garden.scss'

//components
import InputGarden from './inputGarden';

//to not show pop up until pressed
export default function Garden(props) {
  const [name, setname] = useState("")
  const [amount, setamount] = useState("")
  const [buttonPopup, setbuttonPopup] = useState(false)


  //code for post request to the back end.
  const onSubmitForm = async (e) => {
    try {
      const body = { name, amount };
      await axios.post("http://localhost:8080/api/plant-goals", body);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  //to make button in popup stay selected.
  const btnEL = document.querySelectorAll('.innerbutton');
  btnEL.forEach(btnEL => {
    btnEL.addEventListener('click', () => {
      document.querySelector('.special')?.classList.remove('special');
      btnEL.classList.add('special');
    })
  })

  return (
    <div className='garden'>
      <h1 className='banner'>My Garden</h1>

          <InputGarden/>
          {/* <div className='addNew' onClick={() => setbuttonPopup(true)} >
            <Lottie 
              className='buttonPulse'
              loop
              animationData={buttonPulse}
              play
              style={{ width: 150, height: 150 }}
            />
          </div> */}

          {/* <form onSubmit={onSubmitForm}>
            <Popup trigger={buttonPopup} setTrigger={setbuttonPopup}>
              <h1 className='popupHeader'> PLANT A GOAL</h1>
              <p>
                <span className="input">
                  <input type="text" placeholder="Give your goal a name"
                    value={name}
                    onChange={e => setname(e.target.value)}
                  />
                </span>
              </p>

              <p>
                <span className="input">
                  <input type="number" placeholder="How much would you like to save?"
                    value={amount}
                    onChange={e => setamount(e.target.value)}
                  />
                </span>
              </p>
              <div onClick={(e) => onSubmitForm(e.target.value)}>
                <Submit />
              </div>
            </Popup>
          </form> */}
    </div>
  )
}
