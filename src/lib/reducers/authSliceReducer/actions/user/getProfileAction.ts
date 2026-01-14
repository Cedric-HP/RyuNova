import { ProfilRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const getProfileAction = createAsyncThunk<ProfilRespond, string>(
  "AUTH_SLICE/getProfile",
  async (token) => {
    try {
      const res = await fetch(`${SERVER_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token,
        }
      });
      const data: ProfilRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      throw new Error(String(err))
    }
  }
);
export default  getProfileAction;