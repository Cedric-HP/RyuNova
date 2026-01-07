import { RegisterInput, RegisterRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const postRegisterAction = createAsyncThunk<RegisterRespond, RegisterInput>(
  "AUTH_SLICE/postRegister",
  async ({ name, email, password }) => {
    try {
      const res = await fetch(`${SERVER_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail ||`Http error. status: ${res.status}`);
      }

      const data: RegisterRespond = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postRegisterAction;