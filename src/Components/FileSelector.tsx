import { FileCode2, Plus, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

type FileData = {
  [key: string]: {
    name: string;
    data: string;
  };
};

const filedata: FileData = {
  file1fnvokndfoknvklfsnvlkfndklvn: {
    name: "file1fnvokndfoknvklfsnvlkfndklvn",
    data: "data1",
  },
  file2: {
    name: "file2",
    data: "data2",
  },
  file3: {
    name: "file3",
    data: "data3",
  },
  file4: {
    name: "file4",
    data: "data4",
  },
  file5: {
    name: "file5",
    data: "data5",
  },
  file6: {
    name: "file6",
    data: "data6",
  },
};

const FileSelector: React.FC = () => {
  const [SelectedData, setSelectedData] = useState<string>("");
  const [FileSelected, setFileSelected] = useState<string>(
    "file1fnvokndfoknvklfsnvlkfndklvn"
  );

  useEffect(() => {
    setSelectedData(filedata[FileSelected].data);
  }, [FileSelected]);

  return (
    <section className="flex bg-black h-[40px]">
      {Object.values(filedata).map((item) => (
        <div
          key={item.name}
          onClick={() => setFileSelected(item.name)}
          className={`flex items-center w-[180px] justify-between border-r-[1px] font-poppins border-x-gray-600 text-gray-300 px-2 cursor-pointer ${
            FileSelected === item.name &&
            "bg-slate-800 border-t-[1px] border-t-[#0a89ff] text-gray-50 "
          }`}
        >
          <div className="flex justify-start gap-3 items-center">
            <div className="h-[20px] w-[20px]">
              <FileCode2 color="#0a89ff" className="h-[20px] w-[20px]" />
            </div>
            <span
              className="w-[100px] text-ellipsis text-wrap overflow-hidden ..."
              title={item.name}
            >
              {item.name}
            </span>
          </div>
          <div className="h-[16px] w-[16px]">
            <Settings className="h-[16px] w-[16px]" />
          </div>
        </div>
      ))}
      <button className="px-3 ">
        <Plus color="#ffffff" />
      </button>
      <div>{SelectedData}</div>
    </section>
  );
};

export default FileSelector;
