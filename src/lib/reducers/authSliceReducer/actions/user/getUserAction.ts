import { GetUserRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const getUserAction = createAsyncThunk<GetUserRespond, number>(
  "AUTH_SLICE/getUser",
  async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/profile/${id}`, {
        method: "GET",
      });
      const data: GetUserRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getUserAction;