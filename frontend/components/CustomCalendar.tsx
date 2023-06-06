import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import './CustomCalendar.css'

type Props = {
  saveDay: (article: Date | any) => void;
};

export function CustomCalendar(props: Props) {
  const [date, setDate] = useState(new Date());

  function handleChange(value:Value) {
    if(value) {
      const day = new Date(parseInt(value.valueOf().toString()));
      setDate(day);
      props.saveDay(day);
    }
  }

  return (
    <div style={{position:'relative'}}>
      <div className='calendar-container'>
        <Calendar value={date} onChange={(v) => handleChange(v)}/>
      </div>
      </div>
  );
}


