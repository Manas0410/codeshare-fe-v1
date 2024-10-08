import { X } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const AddFileInput = ({
  data,
  onSave,
  closeinput,
  setShowAddFileInput,
}: any) => {
  const [inpData, setinpData] = useState<string>("");
  const [Error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = useCallback(
    () => (value: string) => /^[a-zA-Z0-9]*$/.test(value),
    []
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inpData.trim() === "") {
      setError("Please enter a file name");
    } else if (inpData in data) {
      setError("You can't give the same name to multiple files");
    } else if (!validateInput()(inpData)) {
      setError("Please enter a valid file name");
    } else {
      setError(null);
    }
  }, [inpData, data]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinpData(e.target.value);
  };

  const onBlur = () => {
    if (inpData.trim() === "") {
      setShowAddFileInput(false);
    }
    if (Error) return;
    onSave(inpData);
  };

  const onCloseButtonClick = () => {
    closeinput();
  };

  return (
    <div className="h-full w-[180px] relative">
      <input
        type="text"
        onChange={onInputChange}
        value={inpData}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (Error) return;
            onSave(inpData);
          }
        }}
        ref={inputRef}
        className={`h-full w-full bg-dark-1 pl-2 pr-7 text-white border-2 box-border ${
          Error
            ? "border-red-600 outline-none"
            : "border-[#0a89ff] outline-[#0a89ff]"
        }`}
      />
      <button
        className="absolute top-3 right-2 cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        onClick={onCloseButtonClick}
      >
        <X color="#ffffff" size={16} strokeWidth={1.25} />
      </button>
      {Error && (
        <div className="z-20 absolute px-2 pt-2 pb-8 bg-red-600/10 top-full w-[180px] backdrop-blur-lg text-red-600 border-2 border-t-0 border-red-600">
          {Error}
        </div>
      )}
    </div>
  );
};

export default memo(AddFileInput);
