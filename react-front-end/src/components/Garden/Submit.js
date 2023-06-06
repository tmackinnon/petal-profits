import './submit.scss';

export default function Submit(props) {

  return (
    <div className="wrapper" onClick={() => props.onClick()} >
      <input type="checkbox" name="submit" className="check" id="submit"/>
        <div className="button">
          <span className="submit-text">Submit</span>
          <span className="submit-confirm"><i className="fa fa-check"></i></span>
        </div>
    </div>
  )
};
