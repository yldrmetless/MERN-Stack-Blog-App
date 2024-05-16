import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { DUMMY_POSTS } from "../data";
import Loader from "./Loader";
import axios from 'axios'


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true)
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
        setPosts(response?.data)
      }catch(err){
        console.log(err);
      }

      setIsLoading(false);
    }

    fetchPosts();
  }, [])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="lg:pt-20 pt-28 lg:px-28 px-8 w-full h-screen">
      <div>
        {posts.length > 0 ? (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
            {posts.map(({ _id, thumbnail, category, title, description, creator, createdAt }) => (
              <PostItem
                key={_id}
                postID={_id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                desc={description}
                authorID={creator}
                createdAt={createdAt}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-center">No posts found</h2>
        )}
      </div>
    </section>
  );
};

export default Posts;
