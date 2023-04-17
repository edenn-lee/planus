import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';


function CalendarPage() {
    const [date, setDate] = useState(new Date());
    const onChange = (value) => {
      setDate(value);
    };

    return (
      <div>
        <h1 style={{textAlign: "center"}}>Calendar</h1>
        <Calendar onChange={onChange} value={date} />
      </div>
    );
  }

export default CalendarPage;