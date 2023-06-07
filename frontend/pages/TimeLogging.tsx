import './TimeLogging.css'
import {CustomCalendar} from '../components/CustomCalendar'
import {DataEntry} from '../components/DataEntry'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { changeDay } from '../src/redux/store/dayActionCreators';
import { useCallback } from 'react';
import {EntryTable} from '../components/EntryTable'

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
        <div style={{width: '100%', float:'right', marginTop: '25px'}}>
          <EntryTable day={day}/>
        </div>
      </div>
      </div>
    </>
  )
}
