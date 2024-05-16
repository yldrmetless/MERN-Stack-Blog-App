import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Puff
        visible={true}
        height="90"
        width="90"
        color="#03308A"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
