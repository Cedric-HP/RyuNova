import { FullScreenInput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setFullScreenAction= createAction<FullScreenInput>("UTILITISES-REDUCER/setFullScreen");

export default setFullScreenAction;