import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async() => {
      setIsLoading(true);
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
        setPost(response.data);
        // setCreatorID(response.data.creator);
      }
      catch(err){
        setError(err)
      }
      setIsLoading(false)
    }
    getPost()
  }, [])

  if(isLoading){
    return <Loader/> 
  }

  return (
    <section className="py-20 lg:px-28 px-8 font-secondary">
      {error && (
        <p className="bg-red-500 w-full text-center text-white py-2 rounded-md">
          {error}
        </p>
      )}
      {post && (
        <div className="bg-zinc-100 p-6 shadow-lg rounded-md">
          <div className="flex justify-between items-center">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="flex items-center gap-x-4">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="bg-blue-500 py-2 w-[90px] rounded-md hover:bg-blue-600 transition-all duration-200 text-white flex items-center justify-center"
                >
                  Edit
                </Link>
                <DeletePost postId={id}/>
              </div>
            )}
          </div>
          

          <h1 className="text-4xl font-semibold mt-6">
            {post.title}
          </h1>
          <div className="w-full mt-6">
            <img
              src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt=""
              className="w-full rounded-md overflow-hidden"
            />
          </div>
          <p className="mt-8 leading-8" dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
