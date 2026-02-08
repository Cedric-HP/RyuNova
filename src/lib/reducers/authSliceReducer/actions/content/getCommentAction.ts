import { CommentSearchInput, GetCommentRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const getCommentAction = createAsyncThunk<GetCommentRespond, CommentSearchInput>(
  "AUTH_SLICE/getComment",
  async ({id, limit, sort, type, order}) => {
    try {
      const res = await fetch(`${SERVER_URL}/comment/search?id=${id}&type=${type}&sort=${sort}&limit=${limit}&order=${order}`, {
        method: "GET",
      });
      const data: GetCommentRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getCommentAction;