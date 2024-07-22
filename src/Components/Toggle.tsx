import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "../Services/ReduxService/Reducers/CodeDataReducer";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useUser } from "../Hooks/auth/useUser";
import ToolTip from "./ui/ToolTip";

const Toggle = () => {
  const dispatch = useDispatch();
  const { unicode } = useParams();

  const isEdittingEnable = useSelector(
    (state: any) => state.codeEditorSlice.isEdittingEnabled
  );
  const userIdOfMaker = useSelector(
    (state: any) => state.codeEditorSlice.userIdOfMaker
  );

  const sendEditEnableDataToServer = async (isEditable: boolean) => {
    await callAPI(`/update`, "put", {
      isEditable: isEditable,
      urlCode: unicode,
    });
  };

  const toggleChange = async (e: { target: { checked: any } }) => {
    const isEditable = e.target.checked;
    await sendEditEnableDataToServer(isEditable);
    socket.emit("send_message", { message: "Hello from client" });
    dispatch(toggleEditing(isEditable));
  };

  const { user } = useUser();

  console.log("isEdittingEnable", isEdittingEnable);
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
