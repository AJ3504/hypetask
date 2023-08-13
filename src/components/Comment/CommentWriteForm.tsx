import React from "react";
import { Card, Space, Avatar, Typography, Input, Button } from "antd";
import useInput from "../../hooks/useInput";
import { EditOutlined } from "@ant-design/icons";
import { useCommentStoreDev } from "../../zustand/CommentStore";
import type { Comment } from "../../Types";
import { useSearchParams, useNavigate } from "react-router-dom";
import { today } from "../../consts/consts";
import { useUserStore } from "../../zustand/useUserStore";
type Props = {
  ref_step: number;
  ref_id?: string;
};

const CommentWriteForm = ({ ref_step, ref_id }: Props) => {
  const [comment, __, onChangeComment] = useInput<string>("");
  const commentContainerWidth = useCommentStoreDev(
    (state) => state.parentCommentContainerWidth
  );
  const writeComment = useCommentStoreDev((state) => state.writeComment);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, user_id } = useUserStore((state) => state);
  const writeCommentHandler = async () => {
    if (!comment || comment.length === 0) {
      alert("댓글을 작성해주세요");
      return;
    }
    if (!user || !searchParams.get("uid") || !searchParams.get("day")) {
      alert("잘못된 접근입니다.");
      navigate("/first-main");
      return;
    }
    let data: Comment = {
      user_id: user_id!,
      //task_id: params!.id!,
      date: today,
      comment: comment,
      ref_step: ref_step,
      ref_id: ref_id ? ref_id : null,
      ref_user_id: searchParams.get("uid")!,
    };
    await writeComment(data);
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
      {user ? (
        <Space direction="horizontal">
          <Avatar src={user?.img_url} />
          <Input.TextArea
            placeholder="댓글을 남겨보세요."
            style={{
              width: `${
                (commentContainerWidth - 130) * (1 - 0.16 * ref_step)
              }px`,
            }}
            autoSize={{ minRows: 1, maxRows: 6 }}
            onChange={onChangeComment}
          ></Input.TextArea>
          <Button type="primary" size="middle" onClick={writeCommentHandler}>
            <EditOutlined />
          </Button>
        </Space>
      ) : (
        <Space direction="horizontal">
          <Avatar />
          <Input.TextArea
            placeholder="로그인하고 댓글을 남겨보세요"
            style={{
              width: `${
                (commentContainerWidth - 130) * (1 - 0.16 * ref_step)
              }px`,
            }}
            autoSize={{ minRows: 1, maxRows: 6 }}
            onChange={onChangeComment}
          ></Input.TextArea>
          <Button type="primary" size="middle" onClick={writeCommentHandler}>
            <EditOutlined />
          </Button>
        </Space>
      )}
    </Card>
  );
};

export default CommentWriteForm;
