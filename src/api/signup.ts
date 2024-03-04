import axios from "axios";

const endpoint = "https://fullstack-test-navy.vercel.app/api/users/create";
import { CreateUserInput } from "../types";

export const createAPI = async (payload: CreateUserInput) => {
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, payload)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
