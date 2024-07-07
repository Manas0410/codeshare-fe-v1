import { useDispatch } from "react-redux";
import { toggleEditing } from "../ReduxService/Reducers/CodeDataReducer";

const Toggle = () => {
  const dispatch = useDispatch();

  const toggleChange = (e: { target: { checked: any } }) => {
    dispatch(toggleEditing(e.target.checked));
  };

  return (
    <div className="toggle-button-cover">
      <div id="button-3" className="button r">
        <input
          className="checkbox"
          type="checkbox"
          onChange={toggleChange}
          disabled={true}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default Toggle;
