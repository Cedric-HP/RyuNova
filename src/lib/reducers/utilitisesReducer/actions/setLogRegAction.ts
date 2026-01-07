import { LogRegInput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setLogRegAction= createAction<LogRegInput>("UTILITISES-REDUCER/setLogReg");

export default setLogRegAction;