import React, { useContext, useEffect, useState } from "react";
import { DUMMY_POSTS } from "../data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/users/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(response.data)
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false)
    };
    fetchPosts()
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="lg:px-28 px-8 py-20 w-full h-screen flex justify-center pt-36 font-secondary">
      {posts.length ? (
        <div className="w-full flex flex-col gap-y-4">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-zinc-100 shadow-md p-3 w-full flex justify-between"
            >
              <div className="flex items-center lg:gap-x-10 gap-x-2">
                <div className="lg:w-20 w-40">
                  <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" className="rounded-md" />
                </div>
                <h5 className="font-semibold lg:text-base text-sm">
                  {post.title}
                </h5>
              </div>
              <div className="flex lg:flex-row flex-col items-center gap-x-4 lg:gap-y-0 gap-y-2">
                <Link
                  to={`/posts/${post._id}`}
                  className="lg:w-[120px] w-[80px] lg:text-base text-sm bg-zinc-200 hover:bg-zinc-300 transition-all duration-200 text-black rounded-md py-1 flex items-center justify-center"
                >
                  View
                </Link>
                <Link
                  to={`/posts/${post._id}/edit`}
                  className="lg:w-[120px] w-[80px] lg:text-base text-sm bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-md py-1 flex items-center justify-center"
                >
                  Edit
                </Link>
                <DeletePost postId={post._id}/>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-centers">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
