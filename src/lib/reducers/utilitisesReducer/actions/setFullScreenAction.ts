import { FullScreenImput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setFullScreenAction= createAction<FullScreenImput>("UTILITISES-REDUCER/setFullScreen");

export default setFullScreenAction;