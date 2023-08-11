import { useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";
import { updateChecked } from "../../api/comments";
import { queryClient } from "../../App";
import { useModalStore } from "../../config/useModalStore";
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
              <div>
                <p>{writer}</p>
                <p>{time}</p>
              </div>
              <div>
                <p>{comment}</p>
              </div>
            </S.Cmt>
          );
        })}
      </S.CmtBox>
    </S.ModalBox>
  );
};

export default AlertModal;

const S = {
  ModalBox: styled.div`
    background-color: yellowgreen;
    width: 400px;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;

    position: absolute;
    top: 70px;
    right: 0px;
    z-index: 99;
  `,
  CloseBtn: styled.button`
    background-color: transparent;
    border: none;
    margin: 0 0 10px 350px;
  `,
  CmtBox: styled.div`
    overflow: auto;
  `,
  Cmt: styled.div`
    border-bottom: 1px solid grey;
  `,
};
