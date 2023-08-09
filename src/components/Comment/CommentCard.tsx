import React, { useState } from "react";
import styled from "styled-components";
import { Card, Space, Typography, Avatar } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import type { CommentType } from "../../api/types";
import dayjs from "dayjs";
import { timeTable } from "../Modal";
import { StCommentContainer } from "./CommentContainer";
import { useCommentStore } from "../../zustand/CommentStore";
dayjs.locale("ko");
function CommentCard({
  user,
  comment_id,
  comment = "아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아",
  ref_step,
  ref_id,
  user_id,
  task_id,
  created_at = "2023-08-07 11:18:17.764179+00",
  time_ref = 12,
}: CommentType) {
  const commentContainerWidth = useCommentStore(
    (state) => state.parentCommentContainerWidth
  );
  const [seeMore, setSeeMore] = useState(false);
  const [seeReply, setSeeReply] = useState(false);
  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  const toggleSeeReply = () => {
    setSeeReply(!seeReply);
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
  return (
    <>
      {ref_step > 1 && <></>}
      {ref_step <= 1 && (
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
              <Avatar />
              <Space direction="vertical">
                <Space direction="horizontal">
                  <Typography.Text type="secondary">Ban heesoo</Typography.Text>
                  <Typography.Text type="secondary" aria-setsize={5}>
                    {esimateTimeElapsed(created_at)}
                  </Typography.Text>
                  <Typography.Link onClick={focusTime}>
                    {timeTable[`${time_ref}`].label + " 일정"}
                  </Typography.Link>
                </Space>
                <Typography.Paragraph>
                  {!seeMore
                    ? comment.length > 80
                      ? comment.slice(0, 80) + "..."
                      : comment
                    : comment.slice(0, 130)}

                  {comment.length > 80 ? (
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

                {ref_step < 1 && (
                  <>
                    {seeReply ? (
                      <Typography.Link onClick={toggleSeeReply}>
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
              </Space>
            </Space>
          </Card>
          {seeReply && (
            <StCommentContainer width={commentContainerWidth}>
              <CommentCard ref_step={ref_step + 1} />
              <CommentCard ref_step={ref_step + 1} />
              <CommentCard ref_step={ref_step + 1} />
              <CommentCard ref_step={ref_step + 1} />
              <CommentCard ref_step={ref_step + 1} />
              <CommentCard ref_step={ref_step + 1} />
            </StCommentContainer>
          )}
        </>
      )}
    </>
  );
}

export default CommentCard;
