import { LogRegImput } from "@/lib/types/utilitisesType";
import { createAction } from "@reduxjs/toolkit";

const setLogRegAction= createAction<LogRegImput>("UTILITISES-REDUCER/setLogReg");

export default setLogRegAction;