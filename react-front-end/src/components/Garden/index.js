import 'font-awesome/css/font-awesome.min.css';
import './garden.scss'

//components
import InputGarden from './inputGarden';
import NewGarden from './newGoal';

//to not show pop up until pressed
export default function Garden(props) {

  return (
    <div className='garden'>
      <h1 className='banner'>My Garden</h1>
      <InputGarden/>
    </div>
  )
}
