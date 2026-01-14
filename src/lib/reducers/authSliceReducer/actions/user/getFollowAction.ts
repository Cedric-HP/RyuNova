import { FollowInput, GetFollowRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const getFollowAction = createAsyncThunk<GetFollowRespond, FollowInput>(
  "AUTH_SLICE/getFollow",
  async ({token, targetUserId}) => {
    try {
      const res = await fetch(`${SERVER_URL}/follow/${targetUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token,
        }
      });
      const data: GetFollowRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getFollowAction;