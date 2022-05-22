import { LinksFunction } from '@remix-run/node';
import moment from 'moment'
import stylesUrl from "~/styles/components/calendor.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Calendor() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let dateNow = today.toDateString(); 
  let timeNow = moment().calendar()
           
  return (
    <div className="calendor-container">
      <h2>{dateNow}</h2>
      <div className="calendor-wrapper">
          Calendor placeholder
      </div>
      <div className='time'>{timeNow}</div>
    </div>
  );
}








