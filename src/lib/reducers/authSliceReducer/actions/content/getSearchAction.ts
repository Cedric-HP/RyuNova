import { GetSearchRespond, SearchInput} from "@/lib/types/utilitisesType";
import { createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000'

const getSearchAction = createAsyncThunk<GetSearchRespond, SearchInput>(
  "AUTH_SLICE/getSearch",
  async ({order, page, search, sort, tag, type, user}) => {
    try {
      const res = await fetch(`${SERVER_URL}/search?search=${search}&type=${type}&tag=${tag}&sort=${sort}&order=${order}&user=${user}&page=${page}`, {
        method: "GET",
      });
      const data: GetSearchRespond = await res.json();
      data.code = res.status
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export default getSearchAction;