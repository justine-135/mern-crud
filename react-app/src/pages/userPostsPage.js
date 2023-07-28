import { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../components/posts/allPosts/createForm";
import Posts from "../components/posts/allPosts/posts";
import Tags from "../components/posts/tags/tags";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PostsPage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(null);
  const [filterTags, setFilterTags] = useState([]);

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
  });

  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (Cookies.get("email") === undefined) {
      navigate("/login");
    }
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
    setOpen(true);
  };

  const handleClosePostModal = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <div className={`overlay ${open && "open"}`}></div>
      <div className="create-post-container">
        <div className="create-post-tags-container">
          <Tags filterTags={filterTags} setFilterTags={setFilterTags} />
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
        <Posts
          posts={posts}
          setPosts={setPosts}
          index={index}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
        />
      </div>
    </div>
  );
};

export default PostsPage;
