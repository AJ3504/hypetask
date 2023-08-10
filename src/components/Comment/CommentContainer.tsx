import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import CommentWriteForm from "./CommentWriteForm";
import { Typography } from "antd";
import { useCommentStoreDev } from "../../zustand/CommentStore";
import type { Comment, User } from "../../../Types";
function CommentContainer() {
  const testTaskId = "ba8cf7cd-926d-423b-897a-6b3c6deff9da";

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
    setNumOfComment(testTaskId);
    fetchComments(testTaskId, 0);
  }, []);

  return (
    <StCommentContainer width={commentContainerWidth}>
      <Typography.Title level={4}>댓글{numOfComment}개</Typography.Title>
      <CommentWriteForm ref_step={0} />
      {comments.map((c) => {
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
          />
        );
      })}
    </StCommentContainer>
  );
}

export const StCommentContainer = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
`;

export default CommentContainer;
