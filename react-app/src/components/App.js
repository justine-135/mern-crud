import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/App.scss";
import CreateForm from "./posts/createForm";
import UpdateForm from "./posts/updateForm";
import Posts from "./posts/posts";

const App = () => {
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
    const res = await axios.get("http://localhost:5000/api/posts");

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

export default App;
