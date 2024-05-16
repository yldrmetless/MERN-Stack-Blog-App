import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from 'axios';
import Loader from "../components/Loader";

const DeletePost = ({postId: id}) => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const location = useLocation()

  const [isLoading, setIsLoading] = (false);

  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async() => {
    setIsLoading(true)
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, { headers: {Authorization: `Bearer ${token}`}})

      if(response.status == 200){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0)
        }else{
          navigate("/")
        }
      }
      setIsLoading(false)
    }
    catch(err){
      console.log("Couldn't delete post");
      console.log(err);
    }
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <Link
      className="bg-red-500 py-2 w-[90px] rounded-md hover:bg-red-600 transition-all duration-200 text-white flex items-center justify-center"
      onClick={() => removePost(id)}
    >
      Delete
    </Link>
  );
};

export default DeletePost;
