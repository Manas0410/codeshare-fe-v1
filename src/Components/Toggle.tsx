import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useUser } from "../Hooks/auth/useUser";
import ToolTip from "./ui/ToolTip";
import {
  CodeEditorState,
  getIsEditable,
  updateEditableStateOfFile,
} from "../Services/ReduxService/Reducers/CodeDataReducer";
import { encodeKey } from "../utils/HASHfilename";

const Toggle = () => {
  const dispatch = useDispatch();
  const { unicode } = useParams();

  const isEdittingEnable = useSelector((state: any) => getIsEditable(state));

  const userIdOfMaker = useSelector(
    (state: any) => state.codeEditorSlice.userIdOfMaker
  );

  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );

  const sendEditEnableDataToServer = async (isEditable: boolean) => {
    await callAPI(`/update`, "put", {
      urlCode: unicode,
      fileData: {
        name: encodeKey(selectedFile),
        isEditable: isEditable,
      },
    });
  };

  const toggleChange = async (e: { target: { checked: any } }) => {
    const isEditable = e.target.checked;
    console.log(isEditable);
    await sendEditEnableDataToServer(isEditable);
    socket.emit("send_message", { message: "Hello from client" });
    dispatch(updateEditableStateOfFile(isEditable));
  };

  const { user } = useUser();

  return (
    <ToolTip
      tooltipText="Only maker can use this option"
      isOpen={user?.uid !== userIdOfMaker}
    >
      <div className="toggle-button-cover">
        <div id="button-3" className="button r">
          <input
            className="checkbox"
            type="checkbox"
            onChange={toggleChange}
            checked={isEdittingEnable}
            disabled={user?.uid !== userIdOfMaker}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </div>
    </ToolTip>
  );
};

export default Toggle;
