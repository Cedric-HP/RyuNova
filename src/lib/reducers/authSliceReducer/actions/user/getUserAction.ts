import { GetUserInput, GetUserRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const getUserAction = createAsyncThunk<GetUserRespond, GetUserInput>(
  "AUTH_SLICE/getUser",
  async ({id, isProfil}) => {
    try {
      const res = await fetch(`${SERVER_URL}/profile/${id}`, {
        method: "GET",
      });
      const data: GetUserRespond = await res.json();
      data.code = res.status
      data.isProfil = isProfil
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getUserAction;