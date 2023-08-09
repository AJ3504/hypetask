import React from "react";
import { Card, Space, Avatar, Typography, Input, Button } from "antd";
import useInput from "../../hooks/useInput";
import { EditOutlined } from "@ant-design/icons";
import { follow } from "../../api/user";
type Props = {};

const CommentWriteForm = (props: Props) => {
  const [comment, setComment] = useInput<string>("");
  return (
    <Card
      style={{
        maxHeight: "300px",
        backgroundColor: "#F3F3F3",
        paddingBottom: "0px",
        paddingTop: "0px",
      }}
    >
      <Space direction="horizontal">
        <Avatar />
        <Input.TextArea
          placeholder="댓글을 남겨보세요."
          style={{ width: "100%", minWidth: "360px" }}
          autoSize={{ minRows: 1, maxRows: 6 }}
        ></Input.TextArea>
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            console.log(follow());
          }}
        >
          <EditOutlined />
        </Button>
      </Space>
    </Card>
  );
};

export default CommentWriteForm;
