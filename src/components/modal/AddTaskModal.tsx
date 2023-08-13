import React, { useState } from "react";
import styled from "styled-components";
import { Input, Form } from "antd";
import { Typography } from "antd";
import useInput from "../../hooks/useInput";
import { useForm } from "react-hook-form";
import { Space, DatePicker, Select, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { Tasks, addTask, updateTask } from "../../api/tasks";
import "dayjs/locale/ko";
import { useModalStore } from "../../zustand/useModalStore";
import { timeTable } from "../../consts/consts";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
dayjs.locale("ko");
type IModalProps = {
  todayDefault: boolean;
  task?: Tasks;
  myId: string;
};
const today = dayjs(new Date());

const AddTaskModal: React.FC<IModalProps> = ({
  todayDefault,
  task,
  myId,
}: IModalProps) => {
  const [title, setTitle, onChangeTitle] = useInput("");
  const [date, setDate] = useInput(
    dayjs(new Date()).format("YYYY-MM-DD").toString()
  );
  const [desc, setDesc, onChangeDesc] = useInput("");
  const [startTime, setStartTime] = useInput(
    dayjs(new Date()).locale("ko").format("hh")
  );
  const [endTime, setEndTime] = useInput(
    dayjs(new Date()).locale("ko").format("hh")
  );
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const submitHandler = async () => {
    setIsLoading(true);
    if (startTime >= endTime) {
      alert("종료시간은 시작시간보다 커야합니다.");
      setIsLoading(false);
      return;
    }
    console.log(title, desc, date, startTime, endTime);
    const soj = startTime.indexOf("후") === -1 ? 0 : 12;
    const eoj = endTime.indexOf("후") === -1 ? 0 : 12;
    const startTimeParsed: number = parseInt(startTime.slice(-2)) + soj;
    const endTimeParsed: number = parseInt(endTime.slice(-2)) + eoj;
    if (!title || !desc) {
      setIsLoading(false);
      return;
    }
    await addTask({
      title,
      desc,
      date,
      start_time: startTimeParsed,
      end_time: endTimeParsed,
      user_id: myId,
    });
    setIsLoading(false);
    alert("작성되었습니다");
    changeAddTaskModalstatus();
  };

  const updateTaskMutation = useMutation(
    (newTask: Tasks) => updateTask(newTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followersTasks"]);
        alert("수정되었습니다!");
        changeAddTaskModalstatus();
      },
    }
  );

  const updateBtnHandler = () => {
    const soj = startTime.indexOf("후") === -1 ? 0 : 12;
    const eoj = endTime.indexOf("후") === -1 ? 0 : 12;
    const startTimeParsed: number = parseInt(startTime.slice(-2)) + soj;
    const endTimeParsed: number = parseInt(endTime.slice(-2)) + eoj;
    const newTask = {
      task_id: task?.task_id,
      title,
      desc,
      date,
      start_time: startTimeParsed,
      end_time: endTimeParsed,
      user_id: task?.user_id,
      detail_on: false,
    };

    updateTaskMutation.mutate(newTask);
  };
  const { handleSubmit } = useForm();
  const { changeAddTaskModalstatus } = useModalStore();

  return (
    <>
      <StModalBackGround>
        <StModalContent>
          <Form
            onSubmitCapture={
              task
                ? handleSubmit(updateBtnHandler)
                : handleSubmit(submitHandler)
            }
          >
            <Space
              direction="vertical"
              size="small"
              style={{ display: "flex" }}
            >
              <div>
                <Typography.Title level={2}>일정추가</Typography.Title>

                <Form.Item
                  style={{
                    marginBottom: "10px",
                  }}
                  rules={[{ required: true, message: "제목을 입력해주세요" }]}
                  name="title"
                >
                  <Input
                    onChange={onChangeTitle}
                    size="large"
                    placeholder="제목을 입력해주세요"
                    defaultValue={task ? task.title : ""}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    marginBottom: "10px",
                  }}
                  rules={[{ required: true, message: "제목을 입력해주세요" }]}
                  name="desc"
                >
                  <Input.TextArea
                    onChange={onChangeDesc}
                    style={{ minHeight: "170px" }}
                    size="large"
                    placeholder="내용을 입력해주세요"
                    autoSize={{ minRows: 6, maxRows: 10 }}
                    defaultValue={task ? task.desc : ""}
                  />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={4}>날짜선택</Typography.Title>
                {todayDefault ? (
                  <DatePicker defaultValue={today} disabled />
                ) : (
                  <DatePicker defaultValue={today} onChange={onChangeDate} />
                )}
              </div>

              <div>
                <Space
                  direction="horizontal"
                  size={50}
                  style={{ display: "flex" }}
                >
                  <div>
                    <Typography.Title level={5}>시작시간</Typography.Title>
                    <Space direction="horizontal" size="small">
                      <Form.Item style={{ margin: "0px" }} name="startTime">
                        <Select
                          onChange={setStartTime}
                          options={timeTable}
                          defaultValue={
                            task ? String(task.start_time) : startTime
                          }
                        />
                      </Form.Item>
                      <Typography.Text>시 부터~</Typography.Text>
                    </Space>
                  </div>
                  <div>
                    <Typography.Title level={5}>종료시간</Typography.Title>
                    <Space direction="horizontal" size="small">
                      <Form.Item style={{ margin: "0px" }} name="endTime">
                        <Select
                          defaultValue={task ? String(task.end_time) : endTime}
                          onChange={setEndTime}
                          options={timeTable}
                        />
                      </Form.Item>
                      <Typography.Text>시 까지</Typography.Text>
                    </Space>
                  </div>
                </Space>
              </div>
              <div>
                {isLoading ? (
                  <Button
                    type="primary"
                    style={{ position: "relative", left: "280px" }}
                    loading
                  >
                    제출중
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ position: "relative", left: "280px" }}
                    htmlType="submit"
                  >
                    제출
                  </Button>
                )}
                <Button
                  type="primary"
                  style={{ position: "relative", left: "350px" }}
                  onClick={changeAddTaskModalstatus}
                >
                  닫기
                </Button>
              </div>
            </Space>
          </Form>
        </StModalContent>
      </StModalBackGround>
    </>
  );
};
const StModalBackGround = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;
const StModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 420px;
  height: 500px;
  border-radius: 10px;
`;
export default AddTaskModal;
