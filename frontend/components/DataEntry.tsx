import { useEffect, useState } from "react";
import { getProjects } from "../src/api/project";
import { postEntry } from "../src/api/entry";

type Props = {
  day: Date;
};

export function DataEntry(props: Props) {
  const [hours, setHours] = useState<number | null>();
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<number>();
  const [projects, setProjects] = useState<Project[]>();

  function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;

    setHours(value);
  }

  function handleSubmit() {
    if (hours && description && selectedProject) {
        const entry : Entry = {
            hours: hours,
            project_id: selectedProject.toString(),
            description: description,
            day: props.day.toISOString()
        }

        const sendData = async () => {
            await postEntry(entry);
        };

        sendData();
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "60px",
              overflow: "auto",
            }}
          >
            <p style={{ paddingTop: "10px", margin: "0" }}>Hours</p>
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
            <p style={{ paddingTop: "10px", margin: "0" }}>Project</p>
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
            <p style={{ paddingTop: "10px", margin: "0" }}>Description</p>
            <textarea
              style={{ height: "60px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button style={{padding: '0.3em 0.6em', width:'5em'}} onClick={handleSubmit}>Log</button>
          </div>
        </div>
      </div>
    </>
  );
}
