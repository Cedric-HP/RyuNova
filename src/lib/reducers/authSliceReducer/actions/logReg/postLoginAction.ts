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
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail ||`Http error. status: ${res.status}`);
      }

      const data: LoginRespond = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postRegisterAction;