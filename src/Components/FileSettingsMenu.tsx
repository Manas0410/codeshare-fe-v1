import { Check, FolderPen, Settings, Trash2, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { memo, useCallback, useState } from "react";
import { callAPI } from "../utils/callAPI";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CodeEditorState,
  deletefile,
} from "../Services/ReduxService/Reducers/CodeDataReducer";
import { socket } from "../Services/SocketIOservice/ManageSocketCalls";
import { encodeKey } from "../utils/HASHfilename";
import { LanguageSelector, Toggle } from "..";

const ChangeFileName = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-md shadow-md flex items-center gap-4">
      <span className="text-gray-300">Enter a new name for this file:</span>
      <input
        type="text"
        placeholder="New File Name"
        className="px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button className="text-green-500 hover:text-green-600 transition">
          <Check color="#3780f6" strokeWidth={1.25} />
        </button>
        <button className="text-red-500 hover:text-red-600 transition">
          <X color="#ff0000" strokeWidth={1.25} />
        </button>
      </div>
    </div>
  );
};

const ChangeFileNameMemoized = memo(ChangeFileName);

const ConfirmDeleteFile = ({
  onCancelDelete,
}: {
  onCancelDelete: () => void;
}) => {
  const dispatch = useDispatch();
  const { unicode } = useParams();
  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );

  const deleteFile = async () => {
    try {
      await callAPI(`/deleteFile`, "delete", {
        fileName: encodeKey(selectedFile),
        urlCode: unicode,
      });
      socket.emit("send_message", { message: "Hello from client" });
      dispatch(deletefile());
      onCancelDelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-dark-2 rounded-md shadow-md flex items-center justify-between">
      <span className="text-gray-400">
        Are you sure you want to delete this file?
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={deleteFile}
          className="text-red-500 hover:text-red-600 transition"
        >
          <Check color="#fa0000" strokeWidth={1.25} />
        </button>
        <button
          className="text-green-500 hover:text-green-600 transition"
          onClick={onCancelDelete}
        >
          <X color="#3780f6" strokeWidth={1.25} />
        </button>
      </div>
    </div>
  );
};

const ConfirmDeleteFileMemoized = memo(ConfirmDeleteFile);

const MenuItems = () => {
  const [DeleteConfirm, setDeleteConfirm] = useState(false);

  const onCancelDelete = useCallback(() => {
    setDeleteConfirm(false);
  }, []);

  return (
    <section className="w-[350px] h-[450px] p-4 text-white flex flex-col justify-between">
      <div>
        <div className="flex gap-4 mt-4 items-center pb-4">
          <p className="pb-4">Allow Editting :</p>
          <Toggle />
        </div>
        <p className="pb-2">Select Language :</p>
        <LanguageSelector />
      </div>
      <footer className="flex gap-2 justify-end">
        {/* <button className="flex items-center gap-2 px-2 py-1 text-blue-600 bg-blue-500/30 backdrop-blur-lg rounded-md shadow hover:bg-blue-500/50 focus:ring focus:ring-blue-300 transition duration-150 ease-in-out">
          <FolderPen color="#3780f6" strokeWidth={1.25} /> Rename
        </button> */}

        {!DeleteConfirm ? (
          <button
            onClick={() => setDeleteConfirm(true)}
            className="flex items-center gap-2 px-2 py-1 text-red-600 bg-red-500/30 backdrop-blur-lg rounded-md shadow hover:bg-red-500/50 focus:ring focus:ring-red-300 transition duration-150 ease-in-out"
          >
            <Trash2 color="#ff0000" strokeWidth={1.25} /> Delete
          </button>
        ) : (
          <ConfirmDeleteFileMemoized onCancelDelete={onCancelDelete} />
        )}
      </footer>
      {/* <ChangeFileNameMemoized /> */}
    </section>
  );
};

const MenuItemsMemoized = memo(MenuItems);

const FileSettingsMenu = () => {
  return (
    <NavigationMenu className="dark">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-max h-full p-0 mt-2">
            <Settings className="h-[16px] w-[16px] " color="#ffffff" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-max">
            <MenuItemsMemoized />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default FileSettingsMenu;
