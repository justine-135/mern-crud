import { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../components/posts/allPosts/createForm";
import Posts from "../components/posts/allPosts/posts";

const PostsPage = () => {
  const [posts, setPosts] = useState(null);

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
  });

  const [open, setOpen] = useState(null);

  useEffect(() => {
    index();
  }, []);

  const index = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPostModal = () => {
    setOpen(true);
  };

  const handleClosePostModal = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <div className={`overlay ${open && "open"}`}></div>
      <div className="create-post-container">
        <div>
          <button className="create-post-btn" onClick={handleOpenPostModal}>
            Create post
          </button>
        </div>
      </div>
      <div className={`modal ${open && "open"}`}>
        <div>
          <p>Create a post</p>
          <button onClick={handleClosePostModal}>Close</button>
        </div>
        <CreateForm
          form={form}
          setForm={setForm}
          index={index}
          setOpen={setOpen}
        />
      </div>

      <div className="home-post">
        <Posts posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
};

export default PostsPage;
