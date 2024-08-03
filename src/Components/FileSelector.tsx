import { FileCode2, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { AddFileInput, FileSettingsMenu } from "..";
import { useDispatch, useSelector } from "react-redux";
import {
  CodeEditorState,
  setSelectedFile,
} from "../Services/ReduxService/Reducers/CodeDataReducer";

const FileSelector: React.FC = () => {
  const filedata = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.codeData
  );

  const selectedFile = useSelector(
    (state: { codeEditorSlice: CodeEditorState }) =>
      state.codeEditorSlice.selectedFile
  );

  const [showAddFileInput, setShowAddFileInput] = useState(false);

  const openAddFileInput = useCallback(() => setShowAddFileInput(true), []);
  const closeAddFileInput = useCallback(() => setShowAddFileInput(false), []);

  const dispatch = useDispatch();
  const onFileClick = (file: string) => {
    dispatch(setSelectedFile(file));
  };

  return (
    <section className="flex bg-black h-[40px]">
      {Object.keys(filedata).map((item) => (
        <div
          key={item}
          onClick={() => onFileClick(item)}
          className={`flex items-center w-[180px] justify-between border-r-[1px] font-poppins border-x-gray-600 text-gray-300 px-2 cursor-pointer ${
            selectedFile === item &&
            "bg-slate-800 border-t-[1px] border-t-[#0a89ff] text-gray-50 "
          }`}
        >
          <div className="flex justify-start gap-3 items-center">
            <div className="h-[20px] w-[20px]">
              <FileCode2 color="#0a89ff" className="h-[20px] w-[20px]" />
            </div>
            <span
              className="w-[100px] text-ellipsis text-wrap overflow-hidden ..."
              title={item}
            >
              {item}
            </span>
          </div>
          {item === selectedFile && <FileSettingsMenu />}
        </div>
      ))}

      {!showAddFileInput ? (
        <button className="px-3 " onClick={openAddFileInput}>
          <Plus color="#ffffff" />
        </button>
      ) : (
        <AddFileInput
          data={filedata}
          onSave={() => {}}
          closeinput={closeAddFileInput}
        />
      )}
    </section>
  );
};

export default FileSelector;
