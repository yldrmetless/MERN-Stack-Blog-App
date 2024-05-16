import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header className="fixed shadow w-full bg-white text-gray-800 hover:text-black transition-all duration-200 px-8 lg:px-28 z-50 h-[80px] lg:h-[60px] flex items-center font-primary">
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl font-semibold">Blog</h1>
        </Link>

        {currentUser?.id ? (
          <nav className="hidden md:flex text-sm">
            <ul className="flex justify-center items-center xl:gap-x-8 lg:gap-x-6 md:gap-x-4 text-lg">
              <li className="flex items-center justify-center gap-x-2">
                <Link to={`/profile/${currentUser.id}`}>Profile</Link>
              </li>
              <li className="flex items-center justify-center gap-x-2">
                <Link to={"/create"}>Create Post</Link>
              </li>
              <li className="flex items-center justify-center gap-x-2">
                <Link to={"/authors"} className=" hidden xl:block">
                  Authors
                </Link>
              </li>
              <li className="flex items-center justify-center gap-x-2">
                <Link to={"/logout"} className=" hidden xl:block ">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="hidden md:flex text-sm">
            <ul className="flex justify-center items-center xl:gap-x-8 lg:gap-x-6 md:gap-x-4 text-lg">
              <li className="flex items-center justify-center gap-x-2">
                <Link to={"/authors"} className=" hidden xl:block">
                  Authors
                </Link>
              </li>
              <li className="flex items-center justify-center gap-x-2">
                <Link to={"/login"} className=" hidden xl:block ">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <MobileNav />
    </header>
  );
};

export default Header;
