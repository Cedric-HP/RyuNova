import { StantarRespond, ViewInput } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const getAddContentViewAction = createAsyncThunk<StantarRespond, ViewInput>(
  "AUTH_SLICE/getAddContentView",
  async ({contentId, contentType}) => {
    try {
      const res = await fetch(`${SERVER_URL}/content/${contentType}/${contentId}`, {
        method: "GET",
      });
      const data: StantarRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getAddContentViewAction;