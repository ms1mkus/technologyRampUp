import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar"
import { TimeLogging } from "../pages/TimeLogging"
import { Projects } from "../pages/Projects"
import './App.css'
import { getProjects } from "./api/project";
function App() {
  getProjects();
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

