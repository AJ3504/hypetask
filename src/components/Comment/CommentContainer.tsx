import React, { useState } from "react";
import styled from "styled-components";
import CommentCard from "./CommentCard";
import CommentWriteForm from "./CommentWriteForm";
import { Typography } from "antd";
import { useCommentStore } from "../../zustand/CommentStore";
function CommentContainer() {
  const commentContainerWidth = useCommentStore(
    (state) => state.parentCommentContainerWidth
  );
  return (
    <StCommentContainer width={commentContainerWidth}>
      <Typography.Title level={4}>댓글 2개</Typography.Title>
      <CommentWriteForm />
      <CommentCard ref_step={0} />
    </StCommentContainer>
  );
}

export const StCommentContainer = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
`;

export default CommentContainer;
