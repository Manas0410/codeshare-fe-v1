import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "../Services/ReduxService/Reducers/CodeDataReducer";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { useUser } from "../Hooks/auth/useUser";

const Toggle = () => {
  const dispatch = useDispatch();
  const { unicode } = useParams();

  const isEdittingEnable = useSelector(
    (state: any) => state.codeEditorSlice.isEditingEnabled
  );
  const userIdOfMaker = useSelector(
    (state: any) => state.codeEditorSlice.userIdOfMaker
  );

  const sendEditEnableDataToServer = async (isEditable: boolean) => {
    await callAPI(`/update`, "put", {
      isEditable: isEditable,
      urlCode: unicode,
    });
    socket.emit("send_message", { message: "Hello from client" });
  };

  const toggleChange = async (e: { target: { checked: any } }) => {
    await sendEditEnableDataToServer(e.target.checked);
    dispatch(toggleEditing(e.target.checked));
  };
  const { user } = useUser();
  return (
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
  );
};

export default Toggle;
