import React from "react";
import { Card, Space, Avatar, Typography, Input, Button } from "antd";
import useInput from "../../hooks/useInput";
import { EditOutlined } from "@ant-design/icons";
import { useCommentStore } from "../../zustand/CommentStore";
import { writeComment } from "../../api/comments";
type Props = {
  ref_step: number;
};

const CommentWriteForm = ({ ref_step }: Props) => {
  const [comment, __, onChangeComment] = useInput<string>("");
  const commentContainerWidth = useCommentStore(
    (state) => state.parentCommentContainerWidth
  );
  const writeCommentHandler = async () => {
    await writeComment(null);
  };
  return (
    <Card
      style={{
        maxHeight: "300px",
        backgroundColor: "#F3F3F3",
        paddingBottom: "0px",
        paddingTop: "0px",
        float: "right",
        width: `${commentContainerWidth * (1 - 0.12 * ref_step)}px`,
      }}
    >
      <Space direction="horizontal">
        <Avatar />
        <Input.TextArea
          placeholder="댓글을 남겨보세요."
          style={{
            width: `${(commentContainerWidth - 130) * (1 - 0.16 * ref_step)}px`,
          }}
          autoSize={{ minRows: 1, maxRows: 6 }}
          onChange={onChangeComment}
        ></Input.TextArea>
        <Button type="primary" size="middle" onClick={writeCommentHandler}>
          <EditOutlined />
        </Button>
      </Space>
    </Card>
  );
};

export default CommentWriteForm;
