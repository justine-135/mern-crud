import axios from "axios";
import Comment from "../comments/comments";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Post = ({ posts, post, setPosts }) => {
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/api/posts/${_id}`);

      const newPosts = [...posts].filter((post) => {
        return post._id !== _id;
      });

      setPosts(newPosts);
    } catch (error) {
      console.log(error);
    }
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
          {/* <button>View</button> */}
          <Link to={`/${post._id}`}>View</Link>
        </div>
        {/* <p>Likes: {post.likes}</p>
        <div className="comments"></div>
        <Comment _id={post._id} /> */}
        {/* <button onClick={() => handleDelete(post._id)} type="submit">
          Delete
        </button>
        <button onClick={() => handleUpdate(post)}>Update</button> */}
      </div>
    </div>
  );
};

export default Post;
