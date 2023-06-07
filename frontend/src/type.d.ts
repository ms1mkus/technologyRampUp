type Day = {
  id: number;
  date: Date;
};

type Project = {
  id?: number;
  project_name: string;
};

interface Entry {
  id?: number;
  hours: number;
  project_id: number;
  description: string;
  day: string;
}

interface EntryByDay {
  id?: number;
  hours: number;
  project_name: string;
  description: string;
}

type DayState = {
  day: Date;
};

type DayAction = {
  type: string;
  day: Date;
};

type DispatchType = (args: DayAction) => DayAction;
