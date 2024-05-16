import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../context/userContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);
  

  const changeHandleInput = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async(e) => {
    e.preventDefault();
    setError("");

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      const user = await response.data;
      setCurrentUser(user);
      navigate("/")
    }
    catch(err){
      setError(err.response.data.message)
    }
  }

  return (
    <section className="lg:px-28 px-8 py-20 h-screen">
      <div className="flex justify-center items-center flex-col w-full h-full">
        <h2 className="text-3xl font-semibold">Sign In</h2>
        <form
          className="flex flex-col items-center justify-center w-full p-6 h-[450px] rounded-md max-w-[500px] bg-zinc-100 shadow-md mt-4"
          onSubmit={loginUser}
        >
          {error && (
            <p className="bg-red-500 w-full text-center text-white py-2 rounded-md">
              {error}
            </p>
          )}
          <div className="flex flex-col w-full mt-6 gap-y-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
            />
          </div>
          <button
            type="submit"
            className="inline-block mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <small className="mt-2">
          Don't have an account ?{" "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
