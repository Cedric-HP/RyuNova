import { CheckDuplicateInput, CheckDuplicateRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const checkDuplicateAction = createAsyncThunk<CheckDuplicateRespond, CheckDuplicateInput>(
  "AUTH_SLICE/checkDuplicate",
  async ({ type, value }) => {
    try {
      const res = await fetch(`${SERVER_URL}/checkduplicate?type=${type}&value=${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data: CheckDuplicateRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default checkDuplicateAction;