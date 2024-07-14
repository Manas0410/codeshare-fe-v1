import { useDispatch, useSelector } from "react-redux";
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

// const BASE_API = window.location.href.startsWith("http://localhost:5173")
//   ? "http://localhost:3000"
//   : "https://manascodeshare.onrender.com";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

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

  useEffect(() => {
    socket.on("receive_message", () => {
      getDataFromServer();
    });

    return () => {
      console.log("Cleaning up receive_message listener");
      socket.off("receive_message", getDataFromServer);
    };
  }, []);
  // this block of code is to get the data from server //

  // this block of code is to send the data to server //
  const codeVal = useSelector((state: any) => state.codeEditorSlice.code);

  const sendDataToServer = async () => {
    await callAPI(`/update`, "put", {
      sharedData: codeVal,
      urlCode: unicode,
      languageName: "plainText",
      isEditable: true,
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  useEffect(() => {
    if (codeVal && unicode) sendDataToServer();
    socket.emit("send_message", { message: "Hello from client" });
  }, [codeVal]);

  // this block of code is to send the data to server //

  return <> {children}</>;
};

export default ManageSocketCalls;
