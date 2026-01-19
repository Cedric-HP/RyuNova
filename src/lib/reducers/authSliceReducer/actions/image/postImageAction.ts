import { ImageUploadInput, ImageUploadRespond } from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const postImageAction = createAsyncThunk<ImageUploadRespond, ImageUploadInput>(
  "AUTH_SLICE/postImage",
  async ({token, formData}) => {
    try {
      const res = await fetch(`${SERVER_URL}/image/upload`, {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: formData,
      });
      const data: ImageUploadRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default postImageAction;