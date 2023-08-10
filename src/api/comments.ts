import supabase from "../config/supabaseClient";
import { Comment } from "../Types";

export const writeComment = async (data: Comment | null) => {
  let testData: Comment = {
    user_id: "2d99d192-6ec8-4404-bc60-c0b680f45757",
    task_id: "ba8cf7cd-926d-423b-897a-6b3c6deff9da",
    comment:
      "test comment test commenttest comment test comment v test comment",
    ref_step: 1,
    ref_id: "f3f12dc7-3f40-44cf-bb15-50baf5d0ac49",
  };
  const result = await supabase.from("comments").insert(testData);
  console.log(result);
};

/**
 *
 * @param task_id 태스크아이디
 * @param page 한번에 10개씩 가져옴, 페이지는 0부터 시작
 * @returns Array<Comments>
 */
export const getComments = async (
  task_id: string,
  page: number
): Promise<Comment[]> => {
  let { data: comments } = await supabase
    .from("comments")
    .select("* , user:users(*), num_of_reply:comments(count)")
    .eq("task_id", task_id)
    .eq("ref_step", 0)
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

export const getNumOfComments = async (task_id: string): Promise<number> => {
  const { data: result } = await supabase.from("comments").select("count");
  return result!![0].count;
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
    .select("* , user:users(*), num_of_reply:comments(count)")
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
