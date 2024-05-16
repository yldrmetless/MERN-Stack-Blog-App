import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandleInput = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData)
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser){
        setError("Couldn't register user. Please try again")
      }
      navigate("/login")
    }
    catch(err){
      setError(err.response.data.message)
    }
  };

  return (
    <section className="lg:px-28 px-8 py-20 h-screen">
      <div className="flex justify-center items-center flex-col w-full h-full">
        <h2 className="text-3xl font-semibold">Sign Up</h2>
        <form
          className="flex flex-col items-center justify-center w-full p-6 h-[450px] rounded-md max-w-[500px] bg-zinc-100 shadow-md mt-4"
          onSubmit={registerUser}
        >
          {error && (
            <p className="bg-red-500 w-full text-center text-white py-2 rounded-md">
              {error}
            </p>
          )}
          <div className="flex flex-col w-full mt-6 gap-y-4">
            <input
              type="text"
              placeholder="Full name"
              name="name"
              value={userData.name}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={userData.password2}
              onChange={changeHandleInput}
              className="w-full py-3 px-5 rounded-md focus:outline-none focus:border focus:border-gray-400 border"
            />
          </div>
          <button
            type="submit"
            className="inline-block mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-2 rounded-md"
          >
            Register
          </button>
        </form>
        <small className="mt-2">
          Already have an account ?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
