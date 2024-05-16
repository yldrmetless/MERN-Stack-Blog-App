import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  desc,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDesc = desc.length > 145 ? desc.substr(0, 145) + "..." : desc;
  const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

  return (
    <article className="bg-zinc-100 shadow-md p-4 rounded-md pb-6 transition-all duration-200 cursor-pointer hover:shadow-2xl font-secondary">
      <div className="rounded-md overflow-hidden h-64">
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="mt-6">
        <Link to={`posts/${postID}`}>
          <h3 className="font-semibold text-2xl">{postTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: shortDesc}} className="leading-7 mt-4 tracking-normal"></p>
        <div className="flex justify-between items-end">
          <PostAuthor authorID={authorID} createdAt={createdAt}  />
          <Link
            to={`/posts/categories/${category}`}
            className="bg-zinc-200 py-1 px-3 rounded-md shadow hover:shadow-lg transition-all duration-200"
          >
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
