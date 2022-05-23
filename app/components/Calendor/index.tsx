import moment from 'moment'


export default function Calendor() {
    let now = moment().calendar(); 
           
  return (
    <div>
      <h2>Calendar</h2>
      <div>
          <p>{now}</p>
      </div>
    </div>
  );
}








