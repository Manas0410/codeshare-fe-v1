import { useDispatch } from "react-redux";
import { callAPI } from "../../utils/callAPI";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import {
  setUserIdOfMaker,
  updateCodeData,
} from "../ReduxService/Reducers/CodeDataReducer";
import { ReactNode, useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "../../Components/ui/use-toast";
import { ToastAction } from "../../Components/ui/toast";

const BASE_API = window.location.href.startsWith("http://localhost:517")
  ? "http://localhost:3000"
  : "https://manas.vidhyaskillschool.com/";

// export const socket = io("http://3.110.223.149:3000");
export const socket = io(BASE_API);

const ManageSocketCalls = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { unicode } = useParams();
  const navigate = useNavigate();
  // this block of code is to get the data from server //
  const getDataFromServer = async () => {
    const res = await callAPI(`/get/${unicode}`, "get");

    if ((res as AxiosResponse)?.status !== 200) {
      navigate("/");
      // handle error
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "U probably have entered wrong url or your code has been expired",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    const { data } = res as AxiosResponse;
    dispatch(setUserIdOfMaker(data?.userId));
    dispatch(updateCodeData(data?.sharedData));
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
