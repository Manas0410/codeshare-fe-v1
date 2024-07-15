import { BASE_API } from "../Config/api";
import axios from "axios";
// const BASE_API = "http://3.110.223.149:3000/code";

export const callAPI = async (
  url: string,
  method: "get" | "post" | "put",
  data = {}
) => {
  let res = {};
  try {
    res = await axios({
      method: method,
      url: BASE_API + url,
      ...(data && { data }),
    });
  } catch (err) {
    console.log(err, "Error");
  } finally {
  }
  return res;
};
