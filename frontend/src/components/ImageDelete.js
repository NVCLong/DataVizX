import { useState } from "react";
import axios from "axios";

function ImageDelete() {
  const API = "https://datavizx.onrender.com";
  // eslint-disable-next-line
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [res, setRes] = useState({});

  const handleDelete = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("Do not have userId");
      }
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        `${API}/user/profile/delete/${userId}`,
        data
      );
      setRes(res.data);
      alert("Image has been deleted");
      window.location.reload();
    } catch (error) {
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid pl-6 pr-6 text-center">
      <>
        <button
          onClick={handleDelete}
          className="px-2 py-2 text-sm font-normal text-white transition duration-300 transform bg-purple-600 border border-purple-900 rounded-full cursor-pointer focus:z-10 focus:ring-2 hover:text-white hover:bg-purple-600 focus:ring-blue-500 focus:text-white hover:scale-110"
        >
          {loading ? "Deleting..." : "Delete current avatar"}
        </button>
      </>
    </div>
  );
}
export default ImageDelete;
