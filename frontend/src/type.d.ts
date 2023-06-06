type Day = {
  id: number;
  date: Date;
};

type Project = {
  id: number;
  projectName: string;
};

interface Entry {
  id: number;
  hours: number;
  project_id: string;
  description: string;
  day: number;
}
