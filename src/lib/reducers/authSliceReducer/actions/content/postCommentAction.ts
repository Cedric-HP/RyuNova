import { CommentPostInput, PostCommentRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const postCommentAction = createAsyncThunk<PostCommentRespond, CommentPostInput>(
  "AUTH_SLICE/postComment",
  async ({token, contentId, targetCommentId, comment, contentType, isReply}) => {
    try {
      const res = await fetch(`${SERVER_URL}/comment`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contentId,
          targetCommentId,
          comment,
          contentType,
          isReply
        }),
      });
      const data: PostCommentRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postCommentAction;