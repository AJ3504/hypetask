import { useState } from "react";
import supabase from "./config/supabaseClient";
import Router from "./shared/Router";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useSession } from "@supabase/auth-helpers-react";

// import DateTimePicker from 'react-bootstrap-datetimepicker';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); // tokens, when session exists we have a user

  console.log(eventName);
  console.log(eventDescription);

  //
  const createCalendarEvent = async (): Promise<void> => {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: end.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session?.provider_token, // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
  };

  return (
    <>
      <Router></Router>

      <div style={{ width: "400px", margin: "30px auto" }}>
        <p>Start of your event</p>
        <DateTimePicker
          onChange={(date) => setStart(date as Date)}
          value={start}
        />

        <p style={{ marginTop: "30px" }}>End of your event</p>
        <DateTimePicker onChange={(date) => setEnd(date as Date)} value={end} />
        {/* <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
          /> */}

        <p style={{ marginTop: "30px" }}>Event name</p>
        <input type="text" onChange={(e) => setEventName(e.target.value)} />

        <p style={{ marginTop: "30px" }}>Event description</p>
        <input
          type="text"
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <hr />
        <button onClick={createCalendarEvent}>Create Calendar Event</button>
      </div>
    </>
  );
}

export default App;
