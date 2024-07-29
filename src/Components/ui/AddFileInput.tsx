import { useState } from "react";

const AddFileInput = ({ data }: any) => {
  const [inpData, setinpData] = useState<string>("");
  const [Error, setError] = useState();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinpData(e.target.value);
  };
  return (
    <div className="h-full w-[180px]">
      <input type="text" onChange={onInputChange} value={inpData} />
      {Error && <div>{Error} </div>}
    </div>
  );
};

export default AddFileInput;
