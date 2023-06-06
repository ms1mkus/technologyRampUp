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
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export async function deleteEntry(id: string) {
  try {
    const { data } = await axios.delete<Entry>(`${baseURL}${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export async function getByDay(day: Date) {
  try {
    const { data } = await axios.get<Entry[]>(baseURL, {
      params: { date: day },
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      return error.message;
    } else {
      console.log("unexpected error:", error);
      return "An unexpected error occurred";
    }
  }
}
