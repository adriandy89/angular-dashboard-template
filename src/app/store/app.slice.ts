import { IUser } from "../models";

export interface AppSlice {
  user: IUser | null;
}

export const initialAppSlice: AppSlice = {
  user: null,
}
