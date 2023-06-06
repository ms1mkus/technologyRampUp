import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import './CustomCalendar.css'
export function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  function handleChange(value:Value) {
    if(value) {
      setDate(new Date(parseInt(value.valueOf().toString())))
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


