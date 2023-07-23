import { useState, useEffect } from "react";
import axios from "axios";
import CreateForm from "../components/posts/createForm";
import UpdateForm from "../components/posts/updateForm";
import Posts from "../components/posts/posts";

const PostsPage = () => {
  const [posts, setPosts] = useState(null);

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
  });

  const [updateForm, setUpdateForm] = useState(null);

  useEffect(() => {
    index();
  }, []);

  const index = async () => {
    const res = await axios.get("/api/posts");

    setPosts(res.data);
  };

  return (
    <div className="App">
      {!updateForm && (
        <CreateForm form={form} setForm={setForm} index={index} />
      )}

      {updateForm && (
        <UpdateForm
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          index={index}
        />
      )}

      <div>
        <h2>Posts</h2>
        <Posts
          posts={posts}
          setPosts={setPosts}
          setUpdateForm={setUpdateForm}
        />
      </div>
    </div>
  );
};

export default PostsPage;
