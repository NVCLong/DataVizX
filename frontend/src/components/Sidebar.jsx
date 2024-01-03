import control_icon from "../images/control.png";
import logoMain from "../images/DataVizX.png";
import dashboard_icon from "../images/dashboard_icon.png";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const menus = [
    { title: "Dashboard", src: dashboard_icon, href: "./pages/Login" },
    { title: "B", src: dashboard_icon, href: "#" },
    { title: "C", src: dashboard_icon, href: "#", gap: true },
    { title: "D", src: dashboard_icon, href: "#" },
    { title: "E", src: dashboard_icon, href: "#" },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } duration-500 h-screen p-5 pt-8 backdrop-blur-3xl relative`}
      >
        <img
          src={control_icon}
          className={`absolute cursor-pointer rounded-full -right-3 top-10 w-5 border-2 border-white duration-500
          ${!open && "rotate-180"}`}
          alt="control_icon"
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logoMain}
            alt="logoMain"
            className={`cursor-pointer duration-500 size-10
            ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-xl text-cyan-50 font-semibold duration-300 ${
              !open && "scale-0"
            }`}
          >
            DataVizX
          </h1>
        </div>

        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-2xl flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md
              ${menu.gap ? "mt-9" : "mt-2"}`}
            >
              <a href={menu.href} className="flex items-center">
                <img src={menu.src} alt="menu" width={24} height={24}/>
                <span
                  className={`${!open && "hidden"} pl-3 origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </a>
            </li>
          ))}
        </ul>

      </div>

      <div className="p-7 text-3xl text-white font-bold flex-1 h-screen">
        {/* <h1>Home</h1> */}
      </div>
    </div>
  );
};

export default Sidebar;
