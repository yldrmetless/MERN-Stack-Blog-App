import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-24 py-6 flex flex-col justify-center items-center">
      <ul className="flex items-center justify-center lg:gap-x-6 gap-x-2 mb-8 text-zinc-100">
        <Link
          to={"/posts/categories/Business"}
          className="lg:text-base text-xs"
        >
          Business
        </Link>
        <Link
          to={"/posts/categories/Education"}
          className="lg:text-base text-xs"
        >
          Education
        </Link>
        <Link
          to={"/posts/categories/Entertainment"}
          className="lg:text-base text-xs"
        >
          Entertainment
        </Link>
        <Link to={"/posts/categories/Art"} className="lg:text-base text-xs">
          Art
        </Link>
        <Link
          to={"/posts/categories/Investment"}
          className="lg:text-base text-xs"
        >
          Investment
        </Link>
        <Link
          to={"/posts/categories/Uncategorized"}
          className="lg:text-base text-xs"
        >
          Uncategorized
        </Link>
        <Link to={"/posts/categories/Weather"} className="lg:text-base text-xs">
          Weather
        </Link>
      </ul>
      <div className="text-center text-zinc-100 border-t border-gray-500 w-full pt-2 lg:text-base text-xs">
        <small>All Rights Reserved &copy; Copyright, Mete Yıldırım</small>
      </div>
    </footer>
  );
};

export default Footer;
