import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        setAuthors(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false)
    };

    getAuthors();
  }, []);

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="lg:px-28 px-8 py-20 h-screen">
      {authors.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 font-secondary">
          {authors.map(({ _id: id, avatar, name, posts }) => (
            <Link
              key={id}
              to={`/posts/users/${id}`}
              className="bg-zinc-100 shadow-md rounded-md flex items-center gap-4 transition-all duration-200 p-3"
            >
              <div>
                <img
                  src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
                  alt={`Image of ${name}`}
                  className="aspect-square overflow-hidden rounded-full border border-zinc-400"
                />
              </div>
              <div>
                <h4 className="font-semibold text-xl">{name}</h4>
                <p>Posts: {posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-3xl">No users/authors found</h2>
      )}
    </section>
  );
};

export default Authors;
