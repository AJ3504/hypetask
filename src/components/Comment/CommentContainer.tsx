import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import CommentWriteForm from "./CommentWriteForm";
import { Typography } from "antd";
import { useCommentStoreDev } from "../../zustand/CommentStore";
import type { Comment, User } from "../../Types";
import { useSearchParams, useNavigate } from "react-router-dom";
function CommentContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const commentContainerWidth = useCommentStoreDev(
    (state) => state.parentCommentContainerWidth
  );
  const comments: Comment[] = useCommentStoreDev((state) => state.comment);
  const numOfComment: number = useCommentStoreDev(
    (state) => state.numOfComment
  );
  const setNumOfComment = useCommentStoreDev((state) => state.setNumOfComment);
  const fetchComments = useCommentStoreDev((state) => state.fetchComments);
  useEffect(() => {
    const uid = searchParams.get("uid");
    const day = searchParams.get("day");
    if (!uid || !day) {
      alert("잘못된 접근입니다.");
      navigate("/first-main");
    }
    setNumOfComment(uid!, day!);
    fetchComments(day!, uid!, 0);
  }, []);

  return (
    <StCommentContainer width={commentContainerWidth}>
      <Typography.Title level={4}>
        댓글 {numOfComment ? numOfComment : 0} 개
      </Typography.Title>
      <CommentWriteForm ref_step={0} />
      {comments ? (
        comments.map((c) => {
          return (
            <CommentCard
              comment_id={c.comment_id}
              comment={c.comment}
              ref_step={c.ref_step}
              ref_id={c.ref_id}
              user_id={c.user_id}
              task_id={c.task_id}
              created_at={c.created_at}
              time_ref={c.time_ref}
              replys={c.replys as Comment[]}
              num_of_reply={c.num_of_reply}
              user={c.user as User}
              date={c.date}
              ref_user_id={c.ref_user_id}
            />
          );
        })
      ) : (
        <></>
      )}
    </StCommentContainer>
  );
}

export const StCommentContainer = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
`;

export default CommentContainer;
