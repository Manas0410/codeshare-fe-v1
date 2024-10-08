const DeletedFileFallBack = () => {
  return (
    <section className="w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center bg-slate-800">
      <img src="/file.png" alt="File not found" height={200} width={200} />
      <h1 className="text-white text-2xl"> This file has been Deleted !!</h1>
      <p className="text-white text-lg">
        Please select another file or create a new file
      </p>
    </section>
  );
};

export default DeletedFileFallBack;
