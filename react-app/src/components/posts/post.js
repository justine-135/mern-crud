import axios from "axios";

const Post = ({ posts, post, setPosts, setUpdateForm }) => {
  const handleDelete = async (_id) => {
    const res = await axios.delete(`http://localhost:5000/api/posts/${_id}`);

    const newPosts = [...posts].filter((post) => {
      return post._id !== _id;
    });

    setPosts(newPosts);
  };

  const handleUpdate = (post) => {
    setUpdateForm({
      _id: post._id,
      title: post.title,
      body: post.body,
      category: post.category.toString(),
      tags: post.tags.toString(),
    });
  };
  return (
    <div key={post._id}>
      <h3>{post.title}</h3>
      <div className="post-details">
        <textarea name="" id="" value={post.body} disabled />
        <p>Likes: {post.likes}</p>
        <h5>Categories:</h5>
        <ul>
          {post.category.map((category) => {
            return <li key={category}>{category}</li>;
          })}
        </ul>
        <h5>Tags:</h5>
        <ul>
          {post.tags.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
        <button onClick={() => handleDelete(post._id)} type="submit">
          Delete
        </button>
        <button onClick={() => handleUpdate(post)}>Update</button>
      </div>
    </div>
  );
};

export default Post;
