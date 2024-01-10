import { useState } from "react";
import axios from "axios";

function ImageUpload() {
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
        `http://localhost:3000/user/profile/upload/${userId}`,
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
        <div className="text-center grid gap-8 p-6 m-auto mt-16">
      <label htmlFor="file" className="cursor-pointer px-6 py-2 text-sm font-medium border rounded focus:z-10 focus:ring-2 bg-purple-600 border-purple-900 text-white hover:text-white hover:bg-purple-600 focus:ring-blue-500 focus:text-white transition duration-300 transform hover:scale-110">
        {" "}
        Select image
      </label>
      {file && <center> {file.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
        className="hidden"
      />
      <code className="p-4 bg-black rounded-xl hidden">
        {Object.keys(res).length > 0
          ? Object.keys(res).map((key) => (
              <p className="block text-xl bg-black m-auto " key={key}>
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
          <button onClick={handleUpload} className="btn-text-xl text-white cursor-pointer bg-green-500 p-10 rounded-md w-auto h-fit">
            {loading ? "Uploading..." : "Upload to DataVizX"}
          </button>
        </>
      )}
    </div>
  );
}
export default ImageUpload;
