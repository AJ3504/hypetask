import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Followers, Tasks, Users } from "../../Types";
import { styled } from "styled-components";
import { ContainerStyle } from "../../common/CommonStyle";
import DatePicker from "react-datepicker";

const TasksMain = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const [fetchError, setFetchError] = useState<string | null>(null);

  const [followers, setFollowers] = useState<Followers[] | null>(null);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [tasks, setTasks] = useState<Tasks[] | null>(null);

  // Fetching supabase data
  useEffect(() => {
    const fetchUsers = async () => {
      let { data: users, error } = await supabase.from("users").select("*");
      console.log("users>", users);

      if (error) {
        setFetchError("데이터 불러오기 실패");
        setUsers(null);
        console.log(error);
      }

      if (users) {
        setUsers(users);
        setFetchError(null);
      }
    };

    fetchUsers();
  }, []);

  //
  useEffect(() => {
    const fetchTasks = async () => {
      let { data: tasks, error } = await supabase.from("tasks").select("*");
      console.log("tasks>", tasks);

      if (error) {
        setFetchError("데이터 불러오기 실패");
        setTasks(null);
        console.log(error);
      }

      if (tasks) {
        setTasks(tasks);
        setFetchError(null);
      }
    };

    fetchTasks();
  }, []);

  console.log("start>", start);

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
        {/* ------------------------여기-------------------------------- */}
        <div style={{ width: "400px", margin: "30px auto" }}>
          <p>Start of your event</p>
          <DatePicker onChange={setStart} value={start} />
          <br />
          <br />
          <p>End of your event</p>
          <DatePicker onChange={setEnd} value={end} />
        </div>
      </ContainerStyle>
    </>
  );
};

export default TasksMain;

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
