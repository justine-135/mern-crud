import axios from "axios";
import Comment from "../comments/comments";

const Post = ({ posts, post, setPosts, setUpdateForm, setOpenUpdatePost }) => {
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/posts/${_id}`);

      const newPosts = [...posts].filter((post) => {
        return post._id !== _id;
      });

      setPosts(newPosts);
      setUpdateForm(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = () => {
    setUpdateForm({
      _id: post._id,
      title: post.title,
      body: post.body,
      category: post.category.toString(),
      tags: post.tags.toString(),
    });
    setOpenUpdatePost(true);
  };

  return (
    <div className="post" key={post._id}>
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
      <div>
        <p>{post.body} </p>
        <h3>{post.title}</h3>
        <ul className="categories-ul">
          {post.category.map((category) => {
            return <li key={category}>{category}</li>;
          })}
        </ul>
        <div className="btn-group">
          <button>Like</button>
          <button>View</button>
          <button onClick={handleUpdateModal}>Update</button>
        </div>
        {/* <Comment _id={post._id} /> */}
        {/* <button onClick={() => handleDelete(post._id)} type="submit">
          Delete
        </button>
        <button onClick={() => handleUpdate(post)}>Update</button> */}
      </div>
    </div>
  );
};

export default Post;
