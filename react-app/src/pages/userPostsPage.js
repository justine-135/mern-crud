import { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../components/posts/myPosts/createForm";
import Posts from "../components/posts/myPosts/posts";

const UserPostsPage = () => {
  const [posts, setPosts] = useState(null);

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
  });

  const [openCreatePost, setOpenCreatePost] = useState(null);

  useEffect(() => {
    index();
  }, []);

  const index = async () => {
    try {
      const res = await axios.get("/api/myposts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPostModal = () => {
    setOpenCreatePost(true);
  };

  const handleClosePostModal = () => {
    setOpenCreatePost(false);
  };

  return (
    <div className="home">
      <div className={`overlay ${openCreatePost && "open"}`}></div>
      <button onClick={handleOpenPostModal}>Create post</button>
      <div className={`modal ${openCreatePost && "open"}`}>
        <div>
          <p>Create a post</p>
          <button onClick={handleClosePostModal}>Close</button>
        </div>
        {openCreatePost && (
          <CreateForm
            form={form}
            setForm={setForm}
            index={index}
            setOpenCreatePost={setOpenCreatePost}
          />
        )}
      </div>

      <div className="home-post">
        <Posts posts={posts} setPosts={setPosts} />
      </div>
    </div>
  );
};

export default UserPostsPage;
