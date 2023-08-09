import React from "react";
import Modal from "../components/Modal";
import CommentContainer from "../components/Comment/CommentContainer";
import AddTaskModal from "../components/modal/AddTaskModal";
const Detail = () => {
  return (
    <>
      <CommentContainer /> <AddTaskModal todayDefault={false} />
    </>
  );
};
export default Detail;
