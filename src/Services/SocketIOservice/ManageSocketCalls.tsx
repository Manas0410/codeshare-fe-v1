import { useDispatch } from "react-redux";
import { callAPI } from "../../utils/callAPI";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import {
  setEditorLanguage,
  setUserIdOfMaker,
  toggleEditing,
  updateCode,
} from "../ReduxService/Reducers/CodeDataReducer";
import { ReactNode, useEffect } from "react";
import { io } from "socket.io-client";

const BASE_API = window.location.href.startsWith("http://localhost:5173")
  ? "http://localhost:3000"
  : "https://manascodeshare.onrender.com";

// export const socket = io("http://3.110.223.149:3000");
export const socket = io(BASE_API);

const ManageSocketCalls = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { unicode } = useParams();

  // this block of code is to get the data from server //
  const getDataFromServer = async () => {
    const res = await callAPI(`/get?urlCode=${unicode}`, "get");

    if ((res as AxiosResponse)?.status !== 200) {
      // handle error
    }
    const { data } = res as AxiosResponse;
    dispatch(setUserIdOfMaker(data?.userId));
    dispatch(updateCode(data?.sharedData));
    dispatch(toggleEditing(data?.isEditable));
    dispatch(setEditorLanguage(data?.languageName));
  };

  // initial data load
  useEffect(() => {
    if (unicode) getDataFromServer();
  }, []);

  useEffect(() => {
    socket.on("receive_message", getDataFromServer);

    return () => {
      console.log("Cleaning up receive_message listener");
      socket.off("receive_message", getDataFromServer);
    };
  }, [unicode]);

  return <> {children}</>;
};

export default ManageSocketCalls;
