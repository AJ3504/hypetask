import { styled } from "styled-components";
import { ContainerStyle } from "../common/CommonStyle";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { useRef } from "react";

const Main = () => {
  //
  const localData: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        End: new Date(2019, 0, 11, 6, 30),
        Start: new Date(2019, 0, 11, 4, 0),
        Summary: "",
        IsAllDay: true,
        RecurrenceRule: "FREQ=DAILY; INTERVAL=1; COUNT=5", // issue
        IsBlock: true,
        IsReadonly: true,
      },
      {
        Id: 2,
        End: new Date(2019, 0, 21, 8, 30),
        Start: new Date(2019, 0, 21, 7, 0),
        Summary: "Meeting",
        IsAllDay: true,
      },
    ],
    fields: {
      subject: { name: "Summary", default: "내용을 입력해주세요." },
      startTime: { name: "Start" },
      endTime: { name: "End" },
    },
  };
  //
  const remoteData = new DataManager({
    url: "https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData",
    adaptor: new WebApiAdaptor(),
    crossDomain: true, // crossDomain request 허용
  });

  return (
    <>
      <ContainerStyle>
        <StNonTaskContainer>
          <StLifeQuoteContainer>
            He who can no longer pause to wonder and stand rapt in awe, is as
            good as dead; his eyes are closed.
          </StLifeQuoteContainer>
          <StModalBtn>일정추가</StModalBtn>
        </StNonTaskContainer>
        {/* -------------------------------------------------------- */}
        <StTaskContainer style={{ border: "solid" }}>
          <StMyTaskContainer style={{ backgroundColor: "#faeede" }}>
            <StMyCalendar>Calendar</StMyCalendar>
            <StMyTaskDetail>MyTaskDetail</StMyTaskDetail>
          </StMyTaskContainer>
          <StOthersTaskContainer style={{ backgroundColor: "#faeede" }}>
            others
          </StOthersTaskContainer>
        </StTaskContainer>
        {/* -------------------------default view: Day------------------------------- */}
        {/* <ScheduleComponent currentView="Day" eventSettings={localData}>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent> */}
        {/* -------------------------default view: Month------------------------------- */}
        <ScheduleComponent
          currentView="Month"
          selectedDate={new Date(2019, 0, 11)} // 서비스 출시일인 2017.6월부터 약속잡기 기능 가능
          eventSettings={localData}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </ContainerStyle>
    </>
  );
};

export default Main;

export const StNonTaskContainer = styled.div`
  padding: 10px;
  display: flex;
`;
export const StLifeQuoteContainer = styled.div`
  margin-right: auto;
`;
export const StModalBtn = styled.button`
  margin-left: auto;
`;
//----------------------------------------------//
export const StTaskContainer = styled.div`
  display: flex;
`;
export const StMyTaskContainer = styled.div`
  display: flex;
  margin-right: 20px;
  padding: 10px;
`;
export const StMyCalendar = styled.div`
  margin-right: 10px;
`;
export const StMyTaskDetail = styled.div``;

//----------------------------------------------//
export const StOthersTaskContainer = styled.div`
  display: flex;
  padding: 10px;
`;
