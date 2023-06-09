import axios from "axios";

const baseURL = "http://localhost:3001/api/entry/";

export async function postEntry(entry: Entry) {
  try {
    const { data } = await axios.post<Entry>(baseURL, entry, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return [];
  }
}

export async function deleteEntry(id: string) {
  try {
    const { data } = await axios.delete<Entry>(`${baseURL}${id}`);
    return data;
  } catch (error) {
    return [];
  }
}

export async function getByDay(day: string) {
  try {
    const { data } = await axios.get<Entry[]>(`${baseURL}${day}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        date: day,
      },
    });
    return data;
  } catch (error) {
    return [];
  }
}
