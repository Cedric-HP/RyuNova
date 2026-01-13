import { GetImageRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'

const getImageAction = createAsyncThunk<GetImageRespond, number>(
  "AUTH_SLICE/getImage",
  async (id) => {
    try {
      const res = await fetch(`${SERVER_URL}/image/${id}`, {
        method: "GET",
      });
      const data: GetImageRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getImageAction;