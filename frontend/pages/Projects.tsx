import { useState } from "react";
import { createProject } from "../src/api/project";

export function Projects() {

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  function validateName() {
    if(name.length >= 3) {
      return true;
    }
    else {
      return false;
    }
  }

  function saveProject(e: React.FormEvent<HTMLFormElement>) {
    if (name && validateName()) {
      setNameError("")
      const project : Project = {
        project_name: name
      }

      const sendData = async () => {
          await createProject(project);
      };

      sendData();
    }
    else {
      setNameError("Project name needs to be atleast 3 characters long")
      e.preventDefault();
    }
  }

  return (
    <>
    <h3>Add new project</h3>
    <p style={{ marginBlockEnd: '0'}}>Project name</p>
    {nameError != "" && <p style={{margin: "0", display:'inline', color: 'red', fontSize:'10px'}}>{nameError}</p>}
    <form onSubmit={(e) => {saveProject(e)}}>
    <input value={name} onChange={(e) => {setName(e.target.value)}}></input>
    
    <br></br>
    <button>Save</button>
    </form>
    </>
  )
}
