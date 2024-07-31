import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AddFileInput = ({ data, onSave, closeinput }: any) => {
  const [inpData, setinpData] = useState<string>("");
  const [Error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inpData.trim() === "") {
      setError("Please enter a file name");
    } else if (inpData in data) {
      setError("You can't give the same name to multiple files");
    } else {
      setError(null);
    }
  }, [inpData, data]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinpData(e.target.value);
  };

  const onBlur = () => {
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
        <div className="absolute px-2 pt-2 pb-8 bg-red-200 top-full w-[180px] text-red-600 border-2 border-t-0 border-red-600">
          {Error}
        </div>
      )}
    </div>
  );
};

export default AddFileInput;
