import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { styled } from "styled-components";

const CalendarComponent: React.FC = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [achievements, setAchievements] = useState<
    { date: string; level: string }[]
  >([]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const handleDateClick = (arg: any) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView("timeGridDay", arg.date);
    }
  };

  const handleEventMouseHover = (arg: any) => {
    setHoveredDate(arg.event.startStr);
  };

  const handleEventMouseLeave = () => {
    setHoveredDate(null);
  };

  const handleAddAchievement = (level: string) => {
    if (
      hoveredDate &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(level)
    ) {
      setAchievements([...achievements, { date: hoveredDate, level: level }]);
    }
  };

  const generateEvents = achievements.map((achievement) => ({
    title: achievement.level.toUpperCase(),
    start: achievement.date,
    classNames: [`achievement-${achievement.level}`],
  }));

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date());
    }
  }, []);

  return (
    <MyCalenderContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={generateEvents}
        dateClick={handleDateClick}
        eventMouseEnter={handleEventMouseHover}
        eventMouseLeave={handleEventMouseLeave}
        ref={calendarRef}
      />
      {hoveredDate && (
        <HoveredDatePopup>
          <p>Select achievement level for {hoveredDate}:</p>
          <button onClick={() => handleAddAchievement("zero")}>0</button>
          <button onClick={() => handleAddAchievement("one")}>1</button>
          <button onClick={() => handleAddAchievement("two")}>2</button>
          <button onClick={() => handleAddAchievement("three")}>3</button>
          <button onClick={() => handleAddAchievement("four")}>4</button>

          <button onClick={() => handleAddAchievement("five")}>5</button>

          <button onClick={() => handleAddAchievement("six")}>6</button>
          <button onClick={() => handleAddAchievement("seven")}>7</button>
          <button onClick={() => handleAddAchievement("eight")}>8</button>
          <button onClick={() => handleAddAchievement("nine")}>9</button>
          <button onClick={() => handleAddAchievement("ten")}>10</button>
        </HoveredDatePopup>
      )}
    </MyCalenderContainer>
  );
};

export default CalendarComponent;

const MyCalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 600px;
  width: 500px;

  .achievement-zero {
    background-color: #f0f8ff;
  }
  .achievement-one {
    background-color: #e6e6fa;
  }
  .achievement-two {
    background-color: D8BFD8;
  }
  .achievement-three {
    background-color: #dda0dd;
  }
  .achievement-four {
    background-color: #ee82ee;
  }
  .achievement-five {
    background-color: #da70d6;
  }
  .achievement-six {
    background-color: #ff00ff;
  }
  .achievement-seven {
    background-color: #ba55d3;
  }
  .achievement-eight {
    background-color: #9400d3;
  }
  .achievement-nine {
    background-color: #8a2be2;
  }
  .achievement-ten {
    background-color: #9370db;
  }
`;
const HoveredDatePopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  border: 1px solid lightgray;
  padding: 10px;
  z-index: 100;
`;
