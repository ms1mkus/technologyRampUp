import { useEffect, useState } from "react";
import { getProjects } from "../src/api/project";


type Props = {
    day: Date;
  };

export function DataEntry(props: Props) {
    const [hours, setHours] = useState<number|null>();
    const [description, setDescription] = useState("");
    const [selectedProjects, setSelectedProjects] = useState("");
    const [projects, setProjects] = useState<Project[]>();


    function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;

        setHours(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setProjects(await getProjects());
        }
        
        fetchData()
        .catch(console.error);
      }, []);

    return (
        <> 
        <div style ={{textAlign:'left', height:'25px', borderBottom:'solid 1px #999'}}>
            Selected day: {props.day.toDateString()}
        </div>
        <div style ={{textAlign:'left', height:'80px', overflow: 'auto'}}>
            <p style={{paddingTop:'10px', margin:'0'}}>Project</p>
            <input type="number" value={hours ?? ''} onChange={(e) => handleHoursChange(e)} />
        </div>
        <div style ={{textAlign:'left', height:'80px', overflow: 'auto'}}>
            <p style={{paddingTop:'10px', margin:'0'}}>Hours</p>
            <select>
                {
                 projects?.map((project) => {
                     return <option value={project.id}>{project.projectName}</option>
                 })
              }
            </select>
        </div>
        <div style ={{textAlign:'left', height:'115px', overflow: 'auto'}}>
            <p style={{paddingTop:'10px', margin:'0'}}>Description</p>
            <textarea
                style={{height:'60px'}}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        </>
    );
  }