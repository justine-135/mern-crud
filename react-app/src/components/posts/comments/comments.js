import axios from "axios";
import { useEffect, useState } from "react";
import CreateForm from "./createForm";

const Comments = ({ _id }) => {
  const [comments, setComments] = useState([]);
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

  return (
    <div className="comments-container">
      <CreateForm _id={_id} comments={comments} setComments={setComments} />
      <div className="comments">
        {comments &&
          comments.map((comm, index) => {
            return (
              <div className="comment" key={index}>
                <p>{comm.email}:</p>
                <pre>{comm.comment}</pre>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comments;
