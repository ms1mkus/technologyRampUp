type Day = {
  id: number;
  date: Date;
};

type Project = {
  id: number;
  project_name: string;
};

interface Entry {
  id: number;
  hours: number;
  project_id: string;
  description: string;
  day: number;
}

type DayState = {
  day: Date;
};

type DayAction = {
  type: string;
  day: Date;
};

type DispatchType = (args: DayAction) => DayAction;
