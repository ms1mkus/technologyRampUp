import { useState } from "react";


type Props = {
    day: Date;
  };

export function DataEntry(props: Props) {
    const [hours, setHours] = useState<number|null>();

    function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;

        setHours(value);
    }

    return (
        <>
        <p>{props.day.toDateString()}</p>
            <input type="number" value={hours ?? ''} onChange={(e) => handleHoursChange(e)} />
        </>
    );
  }