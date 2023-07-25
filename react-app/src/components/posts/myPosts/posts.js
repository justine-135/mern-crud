import Post from "./post";
import { useState } from "react";
import UpdateForm from "./updateForm";

const Posts = ({ posts, setPosts }) => {
  const [updateForm, setUpdateForm] = useState(null);
  const [openUpdatePost, setOpenUpdatePost] = useState(null);

  const handleCloseUpdateModal = () => {
    setOpenUpdatePost(false);
  };
  return (
    <div className="posts">
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
          />
        )}
      </div>
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              posts={posts}
              post={post}
              setPosts={setPosts}
              setUpdateForm={setUpdateForm}
              openUpdatePost={openUpdatePost}
              setOpenUpdatePost={setOpenUpdatePost}
            />
          );
        })}
    </div>
  );
};

export default Posts;
