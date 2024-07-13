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

// this block of code is to get the data from server //
const ManageSocketCalls = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { unicode } = useParams();
  const fetchEditorInfo = async () => {
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
    fetchEditorInfo();
  }, []);
  // this block of code is to get the data from server //

  // this block of code is to send the data to server //
  const codeVal = useSelector((state: any) => state.codeEditorSlice.code);

  useEffect(() => {
    if (codeVal && unicode) {
      callAPI(`/update?urlCode=${unicode}`, "put", { sharedData: codeVal });
    }
  }, [codeVal, unicode]);

  // this block of code is to send the data to server //

  return <> {children}</>;
};

export default ManageSocketCalls;
