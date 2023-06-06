import { useState } from "react";

export function DataEntry() {
    const [hours, setHours] = useState("");

    function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value) {
            setHours(e.target.value);
        }
        else {
            setHours("");
        }
    }

    return (
        <input value={hours} onChange={(e) => handleHoursChange(e)} />
    );
  }