import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {category} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`
        );
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="lg:pt-20 pt-28 lg:px-28 px-8 w-full h-screen">
      <div>
        {posts.length > 0 ? (
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
            {posts.map(
              ({
                _id:id,
                thumbnail,
                category,
                title,
                description,
                creator,
                createdAt,
              }) => (
                <PostItem
                  key={id}
                  postID={id}
                  thumbnail={thumbnail}
                  category={category}
                  title={title}
                  desc={description}
                  authorID={creator}
                  createdAt={createdAt}
                />
              )
            )}
          </div>
        ) : (
          <h2 className="text-center">No posts found</h2>
        )}
      </div>
    </section>
  );
};

export default CategoryPost;
