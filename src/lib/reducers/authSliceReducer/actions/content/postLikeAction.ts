import { LikePostInput, PostLikeRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const postLikeAction = createAsyncThunk<PostLikeRespond, LikePostInput>(
  "AUTH_SLICE/postLike",
  async ({token, id, type}) => {
    try {
      const res = await fetch(`${SERVER_URL}/content`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          type
        }),
      });
      const data: PostLikeRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postLikeAction;