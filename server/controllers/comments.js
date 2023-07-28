const Comments = require("../models/comments");

const create = async (req, res) => {
  try {
    console.log(req.body);

    const comments = await Comments.create({
      comment: req.body.comment,
      post: req.body._id,
      email: req.user.email,
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const indexPost = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.find({ post: id });
    // const comment = await Comments.findOne({
    //   post: req.posts._id,
    // });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.deleteOne({ post: id });
    if (!comment) {
      return res
        .status(404)
        .json({ message: `cannot find any posts with ID ${id}` });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  indexPost,
  destroy,
};
