import { useEffect, useState } from "react";
import { getProjects } from "../src/api/project";
import { postEntry } from "../src/api/entry";

type Props = {
  day: Date;
};

export function DataEntry(props: Props) {
  const [hours, setHours] = useState<number | null>();
  const [descError, setDescError] = useState("");
  const [hoursError, setHoursError] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<number>();
  const [projects, setProjects] = useState<Project[]>();

  function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;

    setHours(value);
  }

  function validateDesc() {
    if (description.length >= 3) {
      return true;
    }
    else {
      return false;
    }
  }

  function validateHours() {
    if (hours && hours >= 0.25) {
      return true;
    }
    else {
      return false;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (hours !== undefined && hours !== null && description !== "" && selectedProject !== undefined && selectedProject !== null) {
      if (validateDesc()) {
        setDescError("")     
        if (validateHours()) {
          setHoursError("")
          const entry : Entry = {
            hours: hours,
            project_id: selectedProject,
            description: description,
            day: props.day.toISOString()
          }

          const sendData = async () => {
            await postEntry(entry);
          };

          sendData();
        }
        else {
          e.preventDefault();
          setHoursError("Hours value is 0.25 or greater");
        }
      }
      else {
        e.preventDefault();
        setDescError("Description needs to be atleast 3 characters");
      }
    }
}
  

  useEffect(() => {
    const fetchData = async () => {
      const project = await getProjects();
      setProjects(project);
      setSelectedProject(project[0].id)
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            textAlign: "left",
            height: "25px",
            borderBottom: "solid 1px #999",
          }}
        >
          Selected day: {props.day.toDateString()}
        </div>
        <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          <form  onSubmit={(e) => {handleSubmit(e)}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "65px",
              overflow: "auto",
            }}
          >
            <p style={{ paddingTop: "5px", margin: "0" }}>Hours</p>
            {hoursError != "" && <p style={{margin: "0", display:'inline', color: 'red', fontSize:'10px'}}>{hoursError}</p>}
            <input
                required
              type="number"
              value={hours ?? ""}
              onChange={(e) => handleHoursChange(e)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "60px",
              overflow: "auto",
            }}
          >
            <p style={{ paddingTop: "5px", margin: "0" }}>Project</p>
            <select
            value={selectedProject}
            onChange={e => setSelectedProject(parseInt(e.target.value))}>
              {projects?.map((project) => {
                return (
                  <option value={project.id} key={project.id}>{project.project_name}</option>
                );
              })}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "115px",
              overflow: "auto",
            }}
          >
            <p style={{ paddingTop: "5px", margin: "0" }}>Description</p>
            {descError != "" && <p style={{margin: "0", display:'inline', color: 'red', fontSize:'10px'}}>{descError}</p>}
            <textarea
            required
              style={{ height: "60px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button style={{padding: '0.3em 0.6em', width:'5em'}} type="submit">Log</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
