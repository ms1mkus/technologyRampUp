
import { NavLink } from "react-router-dom";
import './NavBar.css'

export function NavBar() {
    return (
      <nav className="navigation" style={{maxWidth:"100vw", textAlign:'left'}}>
        <div className="item">
        <NavLink to="/">
          Time Logging
        </NavLink>
        </div>
        <NavLink to="/projects">Projects</NavLink>
      </nav>
    );
  }