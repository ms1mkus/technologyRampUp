import { useState } from "react";
import { createProject } from "../src/api/project";

export function Projects() {

  const [name, setName] = useState("");

  function saveProject() {
    if (name) {
      const project : Project = {
        project_name: name
      }

      const sendData = async () => {
          await createProject(project);
      };

      sendData();
  }
  }

  return (
    <>
    <h3>Add new project</h3>
    <p>Project name</p>
    <input value={name} onChange={(e) => {setName(e.target.value)}}></input>
    <br></br>
    <button onClick={saveProject}>Save</button>
    </>
  )
}
