import { BASE_API } from "../Config/api";
import axios from "axios";

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
