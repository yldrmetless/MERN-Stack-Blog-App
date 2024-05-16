import React, { Fragment, useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";




const menuVariants = {
  hidden: {
    x: "100%",
  },
  show: {
    x: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { currentUser } = useContext(UserContext);


  return (
    <nav className="font-primary xl:hidden">
      <div
        onClick={() => setOpenMenu(true)}
        className="text-3xl cursor-pointer"
      >
        <RxHamburgerMenu />
      </div>

      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate={openMenu ? "show" : ""}
        className="bg-white shadow-2xl w-full absolute top-0 right-0 max-w-[250px] h-screen z-20"
      >
        <div
          onClick={() => setOpenMenu(false)}
          className="text-4xl absolute z-30 left-4 top-8 text-primary cursor-pointer"
        >
          <IoMdClose />
        </div>

        {currentUser?.id && (
          <ul className="h-full flex flex-col justify-center items-start px-16 gap-y-8 font-medium font-primary text-lg ">
            <li>
              <Link to={"/profile/asdsad"}>Profile</Link>
            </li>
            <li>
              <Link to={"/create"}>Create Post</Link>
            </li>
            <li>
              <Link to={"/authors"}>Authors</Link>
            </li>
            <li>
              <Link to={"/logout"}>Logout</Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && (
          <ul className="h-full flex flex-col justify-center items-start px-16 gap-y-8 font-medium font-primary text-lg ">
            <li>
              <Link to={"/authors"}>Authors</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        )}
      </motion.div>
    </nav>
  );
};

export default MobileNav;
