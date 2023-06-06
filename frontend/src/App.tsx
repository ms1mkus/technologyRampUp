import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar"
import { TimeLogging } from "../pages/TimeLogging"
import { Projects } from "../pages/Projects"
import './App.css'
function App() {
  return (
    <>
      
      <BrowserRouter>
        <NavBar />        
        <Routes>
          <Route path="/" element={<TimeLogging/>}>
          </Route>
          <Route path="/projects" element={<Projects/>}>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;