import { LoginInput, LoginRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const postRegisterAction = createAsyncThunk<LoginRespond, LoginInput>(
  "AUTH_SLICE/postLogin",
  async ({ email, password }) => {
    try {
      const res = await fetch(`${SERVER_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data: LoginRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postRegisterAction;