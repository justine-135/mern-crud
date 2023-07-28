import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../../comments/comments";
import UpdateForm from "./updateForm";
import axios from "axios";
import Cookies from "js-cookie";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [email, setEmail] = useState(null);

  const [updateForm, setUpdateForm] = useState(null);
  const [openUpdatePost, setOpenUpdatePost] = useState(null);

  const handleCloseUpdateModal = () => {
    setOpenUpdatePost(false);
  };

  useEffect(() => {
    index();
    setEmail(Cookies.get("email"));
  }, []);

  const index = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = () => {
    setUpdateForm({
      _id: post._id,
      title: post.title,
      body: post.body,
      tags: post.tags.toString(),
    });
    setOpenUpdatePost(true);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/posts/${_id}`);
      await axios.delete(`/api/comment/${_id}`);
      // const newPosts = [...posts].filter((post) => {
      //   return post._id !== _id;
      // });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-container">
      <div className="post">
        <div className={`overlay ${openUpdatePost && "open"}`}></div>
        <div className={`modal ${openUpdatePost && "open"}`}>
          <div>
            <p>Update a post</p>
            <button onClick={handleCloseUpdateModal}>Close</button>
          </div>
          {openUpdatePost && (
            <UpdateForm
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              setOpenUpdatePost={setOpenUpdatePost}
              index={index}
            />
          )}
        </div>
        {post && (
          <div>
            <div className="btn-container">
              <Link onClick={() => navigate(-1)}>Back</Link>
              {post.email[0] === email && (
                <div className="btn-group">
                  <button onClick={handleUpdateModal}>Update</button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <ul className="tags-ul">
              {post.tags.map((tag, index) => {
                return (
                  <li key={index}>
                    <span>#</span>
                    {tag}
                  </li>
                );
              })}
            </ul>
            <pre>{post.body}</pre>
            <Comments _id={post._id} likes={post.likes} index={index} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
