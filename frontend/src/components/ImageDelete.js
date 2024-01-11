import { useState } from "react";
import axios from "axios";

function ImageDelete() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [userData, setUserData] = useState(null);
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
          `http://localhost:3000/user/profile/delete/${userId}`,
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
    <div className="text-center grid gap-8 p-6 m-auto mt-16">
      <>
          <button onClick={handleDelete} className="cursor-pointer px-6 py-2 text-sm font-medium border rounded focus:z-10 focus:ring-2 bg-purple-600 border-purple-900 text-white hover:text-white hover:bg-purple-600 focus:ring-blue-500 focus:text-white transition duration-300 transform hover:scale-110">
            {loading ? "Deleting..." : "Delete image"}
          </button>
        </>
    </div>
  );
}
export default ImageDelete;
