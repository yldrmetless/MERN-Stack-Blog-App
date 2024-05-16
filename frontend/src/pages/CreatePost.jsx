import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const CreatePost = () => {
  const [error, setError] = useState("")
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  const navigate = useNavigate();

  //redirect to login page for any user who isn't logged in
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])


  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const createPost = async(e) => {
    e.preventDefault()
    const postData = new FormData();
    postData.set("title", title)
    postData.set("category", category)
    postData.set("description", description)
    postData.set("thumbnail", thumbnail)

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData, { headers: {Authorization: `Bearer ${token}`}})
      if(response.status == 201){
        return navigate("/")
      }
    }
    catch(err){
      setError(err.response.data.message)
    }
  }

  return (
    <section className="py-20 lg:px-28 px-8 w-full h-screen">
      <div className="max-w-[800px] w-full h-full flex pt-16 items-center flex-col font-secondary mx-auto">
        <h2 className="text-3xl font-semibold">Create Post</h2>
        {error && (
          <p className="bg-red-500 w-full text-center text-white py-2 rounded-md">
            {error}
          </p>
        )}
        <form className="flex flex-col w-full mt-12" onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="border px-5 py-2 rounded-md focus:outline-none focus:border-gray-500"
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-6 border px-5 py-2 rounded-md focus:outline-none focus:border-gray-500"
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
            className="mt-6 h-[200px]"
          />
          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg"
            className="mt-16"
          />
          <button
            type="submit"
            className="inline-block mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 transition-all duration-200"
          >
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
