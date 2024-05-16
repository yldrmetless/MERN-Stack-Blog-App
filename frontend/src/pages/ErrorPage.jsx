import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="w-full h-screen flex items-center flex-col justify-center">
      <div className="flex flex-col justify-center items-center gap-y-8">
        <Link
          to={"/"}
          className=" bg-red-500 hover:bg-red-600 transition-all duration-200 py-2 px-4 text-white rounded-lg"
        >
          Go Back Home
        </Link>
        <h2 className="text-4xl">Page Not Found</h2>
      </div>
    </section>
  );
};

export default ErrorPage;
