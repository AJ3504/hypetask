import React, { useCallback, useEffect, useState } from "react";
import { Card, Space, Typography, Avatar, Button } from "antd";
import { DownOutlined, EditFilled, UpOutlined } from "@ant-design/icons";
import type { Comment, User } from "../../Types";
import dayjs from "dayjs";
import { timeTable } from "../../consts/consts";
import { StCommentContainer } from "./CommentContainer";
import { useCommentStoreDev } from "../../zustand/CommentStore";
import CommentWriteForm from "./CommentWriteForm";
dayjs.locale("ko");
function CommentCard({
  comment_id,
  comment,
  ref_step,
  ref_id,
  user_id,
  task_id,
  created_at,
  time_ref,
  replys,
  num_of_reply,
  user,
}: Comment) {
  const commentContainerWidth = useCommentStoreDev(
    (state) => state.parentCommentContainerWidth
  );
  const fetchReplys = useCommentStoreDev((state) => state.fetchReplys);
  const [seeMore, setSeeMore] = useState(false);
  const [seeReply, setSeeReply] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [replyPage, setReplyPage] = useState(0);
  const [seeMoreReply, setSeeMoreReply] = useState(true);
  const [prevReplyPage, setPrevReplyPage] = useState(-1);
  const increasePage = useCallback(() => {
    setReplyPage((prev) => prev + 1);
  }, []);
  const fetchReplysHandler = async () => {
    increasePage();
    const fetchedNum = await fetchReplys(comment_id!!, replyPage);
    console.log(fetchedNum);
    if (fetchedNum < 11) {
      setSeeMoreReply(false);
    }
  };
  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const toggleSeeReply = () => {
    setSeeReply(!seeReply);
    if (prevReplyPage !== replyPage) fetchReplys(comment_id!!, replyPage);
  };
  const closeSeeReply = () => {
    setSeeReply(!seeReply);
    setPrevReplyPage(replyPage);
  };
  const esimateTimeElapsed = (time: string) => {
    const dateTime = new Date(time).getTime();
    const now = Date.now();
    const secondsElapsed = (now - dateTime) / 1000;
    const minutesElapsed = secondsElapsed / 60;
    const hoursElapsed = minutesElapsed / 60;
    const daysElapsed = hoursElapsed / 24;
    if (minutesElapsed < 60) return `${Math.floor(minutesElapsed)}분 전`;
    if (hoursElapsed < 24) return `${Math.floor(hoursElapsed)}시간 전`;
    return `${Math.floor(daysElapsed)}일 전`;
  };
  const focusTime = () => {};
  const toggleReplyForm = async () => {
    setWriteForm(!writeForm);
  };
  return (
    <>
      <>
        <Card
          bodyStyle={{ paddingTop: "5px", paddingBottom: "5px" }}
          style={{
            maxHeight: "300px",
            maxWidth: `${100 - ref_step * 12}%`,
            minWidth: `${100 - ref_step * 12}%`,
            float: "right",
          }}
        >
          <Space direction="horizontal">
            <Avatar src={user?.img_url} />
            <Space direction="vertical">
              <Space direction="horizontal">
                <Typography.Text type="secondary">{user?.name}</Typography.Text>
                <Typography.Text type="secondary" aria-setsize={5}>
                  {esimateTimeElapsed(created_at!!)}
                </Typography.Text>
                <Typography.Link onClick={focusTime}>
                  {timeTable[`${time_ref!!}`].label
                    ? timeTable[`${time_ref!!}`].label + " 일정"
                    : ""}
                </Typography.Link>
              </Space>
              <Typography.Paragraph>
                {!seeMore
                  ? comment!!.length > 80
                    ? comment!!.slice(0, 80) + "..."
                    : comment!!
                  : comment!!.slice(0, 130)}

                {comment!!.length > 80 ? (
                  <Typography.Link
                    style={{ color: "#AAAAAA" }}
                    onClick={toggleSeeMore}
                  >
                    {seeMore ? (
                      <>
                        <br />
                        간략히
                      </>
                    ) : (
                      "더보기"
                    )}
                  </Typography.Link>
                ) : (
                  <></>
                )}
              </Typography.Paragraph>
              <Space direction="horizontal">
                {num_of_reply!! > 0 && (
                  <>
                    {seeReply ? (
                      <Typography.Link onClick={closeSeeReply}>
                        댓글접기&nbsp;
                        <UpOutlined />
                      </Typography.Link>
                    ) : (
                      <Typography.Link onClick={toggleSeeReply}>
                        댓글보기&nbsp;
                        <DownOutlined />
                      </Typography.Link>
                    )}
                  </>
                )}
                <Button
                  shape="circle"
                  onClick={toggleReplyForm}
                  style={{
                    border: "none",
                  }}
                >
                  <EditFilled />
                </Button>
              </Space>
            </Space>
          </Space>
        </Card>
        {writeForm && <CommentWriteForm ref_step={ref_step + 1} />}
        {seeReply && (
          <StCommentContainer width={commentContainerWidth}>
            {replys!!.map((c) => {
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
            {seeMoreReply && (
              <Card
                bodyStyle={{ border: "0px", padding: "14px" }}
                style={{ float: "right", cursor: "pointer", color: "blue" }}
                onClick={fetchReplysHandler}
              >
                더보기
                <DownOutlined />
              </Card>
            )}
          </StCommentContainer>
        )}
      </>
    </>
  );
}

export default CommentCard;
