import './TimeLogging.css'
import {CustomCalendar} from '../components/CustomCalendar'
import {DataEntry} from '../components/DataEntry'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { changeDay } from '../src/redux/store/dayActionCreators';
import { useCallback } from 'react';

export function TimeLogging() {
  const day : Date = useSelector(
    (state: DayState) => state.day
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveDay = useCallback(
    (day: Date) => dispatch(changeDay(day)),
    [dispatch]
  );

  return (
    <>
    <div className='time'>
    <h2 style={{textAlign:'left'}}>Time Logging</h2>
      <div style={{width: '80vw', maxWidth: '1200px', minWidth:'800px'}}>
        <div style={{width: '54%', height: '300px',  float:'left', overflow:'auto' }}>
          <CustomCalendar saveDay={saveDay}/>
        </div>
        <div style={{backgroundColor: '#ddd', width: '43%', height: '300px',  float:'right'}}>
          <DataEntry day={day}/>
        </div>
        <div style={{backgroundColor: '#ddd', width: '100%', height: '145px',  float:'right', marginTop: '25px'}}>
          <p>Logged entries         
          </p>
        </div>
      </div>
      </div>
    </>
  )
}
