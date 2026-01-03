import { ContentData } from "@/lib/types/contenteType";
import { createAction } from "@reduxjs/toolkit";

const setCurrentImageAction= createAction<ContentData>("UTILITISES-REDUCER/setCurrentImage");

export default setCurrentImageAction;