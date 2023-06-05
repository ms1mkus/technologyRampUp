import './TimeLogging.css'

export function TimeLogging() {
  return (
    <>
    <h2 style={{textAlign:'left'}}>Time Logging</h2>
      <div style={{backgroundColor: '#fFf', width: '80vw', height: '100vh', maxWidth: '1200px'}}>
        <div style={{backgroundColor: '#ddd', width: '52%', height: '500px',  float:'left', }}>
          <p>Calendar            
          </p>
        </div>
        <div style={{backgroundColor: '#ddd', width: '43%', height: '500px',  float:'right'}}>
          <p>Data entry            
          </p>
        </div>
        <div style={{backgroundColor: '#ddd', width: '100%', height: '145px',  float:'right', marginTop: '25px'}}>
          <p>Logged entries         
          </p>
        </div>
      </div>
    </>
  )
}
