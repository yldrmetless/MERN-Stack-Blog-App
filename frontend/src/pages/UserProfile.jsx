import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");

  const [isAvatarTouched, setAvatarTouched] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const changeAvatarHandler = async (e) => {
    setAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    };

    getUser();
  }, []);

  const updateUserDetails = async () => {
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        //log user out
        navigate("/logout");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="lg:px-28 px-8 py-20">
      <div className="w-full h-screen flex pt-2 items-center flex-col">
        <Link
          to={`/myposts/${currentUser.id}`}
          className="text-3xl font-semibold"
        >
          My Posts
        </Link>
        <div className="mt-4 max-w-[500px] w-full">
          <div className="relative">
            <div className="relative w-64 h-64 border-4 mx-auto rounded-full overflow-hidden cursor-pointer">
              <img
                src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
                alt=""
                className="w-64 mx-auto rounded-full overflow-hidden cursor-pointer"
              />
            </div>

            <form className="">
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                className="absolute top-0 left-28 w-64 h-full opacity-0"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-2 xl:right-40 right-16 bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-white"
                onClick={() => setAvatarTouched(true)}
              >
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="absolute bottom-2 xl:right-40 right-16 bg-purple-600 w-8 h-8 flex items-center justify-center text-white rounded-full cursor-pointer"
                onClick={changeAvatarHandler}
              >
                <FaCheck className="text-xl" />
              </button>
            )}
          </div>
          <h1 className="text-center text-3xl font-semibold">
            {currentUser.name}
          </h1>

          <form
            className="flex flex-col gap-y-4 max-w-[500px] w-full mt-4"
            onSubmit={updateUserDetails}
          >
            {error && (
              <p className="bg-red-500 w-full text-center text-white py-2 rounded-md">
                {error}
              </p>
            )}

            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none border py-2 px-5 rounded-md focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none border py-2 px-5 rounded-md focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="focus:outline-none border py-2 px-5 rounded-md focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="focus:outline-none border py-2 px-5 rounded-md focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="focus:outline-none border py-2 px-5 rounded-md focus:border-gray-500"
            />
            <button
              className="inline-block mt-4 w-full bg-blue-500 py-2 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
              type="submit"
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
