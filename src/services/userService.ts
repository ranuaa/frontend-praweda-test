import axios from "axios";
import { User } from "../types/user";

export const getUsers = async (params: {
  page: number;
  results: number;
}): Promise<User[]> => {
  const { data } = await axios.get(
    "http://localhost:3000/user/user?",
    { params }
  );

  return data.data; 
};