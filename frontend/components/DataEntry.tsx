import { useState } from "react";

export function DataEntry() {
    const [hours, setHours] = useState<number|null>();

    function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;

        setHours(value);
    }

    return (
        <input type="number" value={hours ?? ''} onChange={(e) => handleHoursChange(e)} />
    );
  }