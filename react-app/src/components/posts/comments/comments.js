import axios from "axios";
import { useEffect, useState } from "react";
import CreateForm from "./createForm";

const Comments = ({ _id, likes, index }) => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment/${_id}`);
        setComments(...comments, res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    setCommentsCount(comments.length);
  }, [comments]);

  const handleLike = async () => {
    try {
      await axios.put(`/api/like/${_id}`);
      index();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments-container">
      <div className="comments">
        <div className="comments-likes-container">
          <button onClick={handleLike}>
            Like <span>{likes}</span>
          </button>
          <div>
            Comments <span>{commentsCount}</span>
          </div>
        </div>
        <CreateForm _id={_id} comments={comments} setComments={setComments} />

        <div className="all-comments">
          {comments &&
            comments.map((comm, index) => {
              return (
                <div className="comment" key={index}>
                  <p>{comm.email}:</p>
                  <div className="comment-container">
                    <pre>{comm.comment}</pre>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
