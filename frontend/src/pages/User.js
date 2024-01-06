import Sidebar from "../components/Sidebar";
const User = () => {
  return (
    <div className="flex">
      <div className="#">
        <Sidebar />
      </div>

      <div className="pt-40 pr-10 mx-auto" id="mainClass">
        <div className="mx-auto">
          <div>
            <div className="bg-white relative shadow rounded-lg mx-auto pb-3 w-auto">
              <div className="flex justify-center">
                <img
                  src="https://res.cloudinary.com/dvq5hclxc/image/upload/v1704529090/user-image/izxjc57sxtdf7ezgmos2.jpg"
                  alt="logoMain"
                  className="object-cover rounded-full mx-auto absolute -top-20  w-56 h-56 shadow-md border-4 border-white transition duration-300 transform hover:scale-110"
                />
              </div>

              <div className="mt-16 pt-24">
                <h1 className="font-bold text-center text-4xl text-gray-900">
                  DataVizX
                </h1>
                <p className="text-center text-sm text-gray-400 font-medium">
                  Administrator
                </p>
                <div className="my-5 px-6">
                  <a
                    href="/chartList"
                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
                  >
                    View chart of <span className="font-bold">@DataVizX</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
