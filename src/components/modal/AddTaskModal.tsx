import React, { useState } from "react";
import styled from "styled-components";
import { Input, Form } from "antd";
import { Typography } from "antd";
import useInput from "../../hooks/useInput";
import { useForm } from "react-hook-form";
import { Space, DatePicker, Select, Button } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { addTask } from "../../api/tasks";
import "dayjs/locale/ko";
import { useModalStore } from "../../config/useModalStore";
dayjs.locale("ko");
type IModalProps = {
  todayDefault: boolean;
};
const timeTable = [
  { value: "00", label: "오전:00" },
  { value: "01", label: "오전:01" },
  { value: "02", label: "오전:02" },
  { value: "03", label: "오전:03" },
  { value: "04", label: "오전:04" },
  { value: "05", label: "오전:05" },
  { value: "06", label: "오전:06" },
  { value: "07", label: "오전:07" },
  { value: "08", label: "오전:08" },
  { value: "09", label: "오전:09" },
  { value: "10", label: "오전:10" },
  { value: "11", label: "오전:11" },
  { value: "12", label: "오후:00" },
  { value: "13", label: "오후:01" },
  { value: "14", label: "오후:02" },
  { value: "15", label: "오후:03" },
  { value: "16", label: "오후:04" },
  { value: "17", label: "오후:05" },
  { value: "18", label: "오후:06" },
  { value: "19", label: "오후:07" },
  { value: "20", label: "오후:08" },
  { value: "21", label: "오후:09" },
  { value: "22", label: "오후:10" },
  { value: "23", label: "오후:11" },
];
const today = dayjs(new Date());

const AddTaskModal: React.FC<IModalProps> = ({ todayDefault }: IModalProps) => {
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
      user_id: "2d99d192-6ec8-4404-bc60-c0b680f45757",
    });
    setIsLoading(false);
    alert("작성되었습니다");
  };
  const { handleSubmit } = useForm();
  const { changeAddTaskModalstatus } = useModalStore();

  return (
    <>
      <StModalBackGround onClick={changeAddTaskModalstatus}>
        <StModalContent>
          <Form onSubmitCapture={handleSubmit(submitHandler)}>
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
                          defaultValue={startTime}
                          onChange={setStartTime}
                          options={timeTable}
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
                          defaultValue={endTime}
                          onChange={setEndTime}
                          options={timeTable}
                        />
                      </Form.Item>
                      <Typography.Text>시 까지</Typography.Text>
                    </Space>
                  </div>
                </Space>
              </div>
              {isLoading ? (
                <Button
                  type="primary"
                  style={{ position: "relative", left: "350px" }}
                  loading
                >
                  제출중
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ position: "relative", left: "350px" }}
                  htmlType="submit"
                >
                  제출
                </Button>
              )}
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
