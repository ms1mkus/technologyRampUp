import './TimeLogging.css'
import {CustomCalendar} from '../components/CustomCalendar'
import {DataEntry} from '../components/DataEntry'

export function TimeLogging() {
  return (
    <>
    <div className='time'>
    <h2 style={{textAlign:'left'}}>Time Logging</h2>
      <div style={{width: '80vw', height: '100vh', maxWidth: '1200px'}}>
        <div style={{width: '54%', height: '300px',  float:'left', overflow:'auto' }}>
          <CustomCalendar />
        </div>
        <div style={{backgroundColor: '#ddd', width: '43%', height: '300px',  float:'right'}}>
          <DataEntry />
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
