import { useState } from "react";
import axios from "axios";

function ImageUpload() {
    const API = "https://datavizx.onrender.com";
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});

  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        `${API}/user/profile/upload/${userId}`,
        data
      );
      setRes(res.data);
      alert("Image has been uploaded");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid gap-8 pt-6 pl-6 pr-6 text-center">
      <label
        htmlFor="file"
        className="px-2 py-2 text-sm font-normal text-white transition duration-300 transform bg-purple-600 border border-purple-900 rounded-full cursor-pointer focus:z-10 focus:ring-2 hover:text-white hover:bg-purple-600 focus:ring-blue-500 focus:text-white hover:scale-110"
      >
        {" "}
        Select new avatar
      </label>
      {file && <center> {file.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
        className="hidden"
      />
      <code className="hidden p-4 rounded-xl">
        {Object.keys(res).length > 0
          ? Object.keys(res).map((key) => (
            <p className="block m-auto text-xl bg-purple " key={key}>
              <span>{key}:</span>
              <span>
                {typeof res[key] === "object" ? "object" : res[key]}
              </span>
            </p>
          ))
          : null}
      </code>
      {file && (
        <>
          <button
            onClick={handleUpload}
            className="w-48 p-2 mx-auto text-white transition duration-300 transform bg-purple-500 rounded-md cursor-pointer btn-text-xl hover:scale-110"
          >
            {loading ? "Uploading..." : "Click to upload avatar"}
          </button>
        </>
      )}
    </div>
  );
}
export default ImageUpload;
