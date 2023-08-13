import { useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";
import { updateChecked } from "../../api/comments";
import { queryClient } from "../../App";
import { useModalStore } from "../../zustand/useModalStore";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface AlertModalProps {
  myTaskIds: string[] | undefined | [];
  myComments: MyComment[];
}

export interface MyComment {
  username: string;
  created_at: string | undefined;
  checked: boolean | undefined;
  comment: string;
}

const AlertModal = ({ myTaskIds, myComments }: AlertModalProps) => {
  const updateCheckedMutation = useMutation(
    (myTaskIds: string[]) => updateChecked(myTaskIds as string[]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myComments"]);
      },
    }
  );

  const { changeAlertModalstatus } = useModalStore();

  const alertModalCloseBtnHandler = () => {
    changeAlertModalstatus(false);
    updateCheckedMutation.mutate(myTaskIds!);
  };

  return (
    <S.ModalBox>
      <S.CloseBtn onClick={alertModalCloseBtnHandler}>
        <AiOutlineCloseCircle size="23" />
      </S.CloseBtn>
      {myComments.length > 0 ? (
        <S.CmtBox>
          {myComments?.map((myComment) => {
            const writer = myComment.username;
            const time = myComment.created_at
              ?.slice(6, 16)
              .replace("T", " ")
              .replace("-", "/");
            const comment = myComment.comment;
            return (
              <S.Cmt>
                <S.CmtInfo>
                  <S.AlertText>{writer}</S.AlertText>
                  <S.AlertText>{time}</S.AlertText>
                </S.CmtInfo>
                <S.CmtBody>
                  <S.AlertText>{comment}</S.AlertText>
                </S.CmtBody>
              </S.Cmt>
            );
          })}
        </S.CmtBox>
      ) : (
        <S.CmtBox>
          <S.AlertText>새로운 댓글이 없습니다.</S.AlertText>
        </S.CmtBox>
      )}
    </S.ModalBox>
  );
};

export default AlertModal;

const S = {
  ModalBox: styled.div`
    background-color: #f3f3f3;
    width: 400px;
    max-height: 300px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 3px;

    position: absolute;
    top: 70px;
    right: 0px;
    z-index: 9999;
  `,
  CloseBtn: styled.button`
    background-color: transparent;
    border: none;
    margin: 0 0 10px 350px;
  `,
  CmtBox: styled.div`
    overflow: auto;
    text-align: center;
    margin-bottom: 10px;
  `,
  Cmt: styled.div`
    /* border-bottom: 1px solid grey; */
  `,
  CmtInfo: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  `,
  CmtBody: styled.div`
    margin-bottom: 20px;
  `,
  AlertText: styled.p`
    color: black;
  `,
};
