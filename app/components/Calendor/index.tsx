import moment from 'moment'


export default function Calendor() {
    let now = moment().format('LLLL');        
  return (
    <div>
      <h1>Calendor</h1>
      <div>
          <h2>{now}</h2>
      </div>
    </div>
  );
}








