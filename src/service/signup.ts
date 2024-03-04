import { createAPI } from "../api/signup";
import { CreateUserInput } from "../types";

export const createUserService = (payload: CreateUserInput) => {
  return new Promise((resolve, reject) => {
    createAPI(payload)
      .then((res: any) => resolve(res.data))
      .catch((err) => reject(err.response.data));
  });
};
