import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAuthor();
  });

  return (
    <Link to={`/posts/users/${authorID}`} className="flex gap-4 items-start mt-8">
      <div className="w-10 aspect-square rounded-xl overflow-hidden">
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${author?.avatar}`}
          alt=""
        />
      </div>
      <div>
        <h4 className="font-semibold">By: {author?.name}</h4>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
