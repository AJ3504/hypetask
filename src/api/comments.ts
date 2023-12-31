import supabase from "../config/supabaseClient";
import { Comment } from "../Types";
export const writeComment = async (data: Comment | null): Promise<Comment> => {
  let { data: comments } = await supabase
    .from("comments")
    .insert(data)
    .select("* , user:user_id(*)  ,num_of_reply:comments(count)");

  let temp: Comment[] = [];
  const commentsLength = comments === null ? 0 : comments.length;
  for (let i = 0; i < commentsLength; i++) {
    comments![i].replys = temp;
    comments![i].num_of_reply = comments![i].num_of_reply[0].count;
  }
  return comments![0] as Comment;
};
export const deleteComment = async (commentId: string): Promise<void> => {
  let result = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", commentId)
    .select();
  console.log(result);
};
/**
 *
 * @param task_id 태스크아이디
 * @param page 한번에 10개씩 가져옴, 페이지는 0부터 시작
 * @returns Array<Comments>
 */
export const getComments = async (
  date: string,
  user_id: string,
  page: number
): Promise<Comment[] | null> => {
  let { data: comments } = await supabase
    .from("comments")
    .select(
      "* , user:user_id(*)  ,num_of_reply:comments(count), task:task_id(*)"
    )
    .eq("date", date)
    .eq("ref_step", 0)
    .eq("ref_user_id", user_id)
    .range(page * 10, (page + 1) * 10); //대댓글은 안가져옴
  let temp: Comment[] = [];
  const commentsLength = comments === null ? 0 : comments.length;
  for (let i = 0; i < commentsLength; i++) {
    comments![i].replys = temp;
    comments![i].num_of_reply = comments![i].num_of_reply[0].count;
  }
  console.log(comments);
  return comments as Comment[];
};

export const getNumOfComments = async (
  date: string,
  user_id: string
): Promise<number | null> => {
  const { data: result } = await supabase
    .from("comments")
    .select("count")
    .eq("date", date)
    .eq("ref_user_id", user_id);
  const numOfComment = result ? result[0].count : 0;
  return numOfComment;
};
/**
 *
 * @param comment_id 참조하는 댓글아이디
 * @param page 한번에 10개씩 가져옴, 페이지는 0부터 시작
 * @returns Array<Comments>
 */
export const getReplys = async (
  comment_id: string,
  page: number
): Promise<Comment[]> => {
  let { data: comments } = await supabase
    .from("comments")
    .select(
      "* , user:user_id(*)  ,num_of_reply:comments(count), task:task_id(*)"
    )
    .eq("ref_id", comment_id)
    .range(page * 10, (page + 1) * 10); //대댓글은 안가져옴
  let temp: Comment[] = [];
  const commentsLength = comments === null ? 0 : comments.length;
  for (let i = 0; i < commentsLength; i++) {
    comments![i].replys = temp;
    comments![i].num_of_reply = comments![i].num_of_reply[0].count;
  }
  return comments as Comment[];
};

export const getMyComments = async (myId: string): Promise<Comment[]> => {
  const { data: myComments } = await supabase
    .from("comments")
    .select("*")
    .eq("ref_user_id", myId);

  return myComments as Comment[];
};

export const updateChecked = async (myId: string): Promise<void> => {
  await supabase
    .from("comments")
    .update({ checked: true })
    .eq("ref_user_id", myId)
    .select();
};
