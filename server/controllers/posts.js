const Posts = require("../models/posts");

const create = async (req, res) => {
  try {
    const { title, body, category, tags } = req.body;
    const posts = await Posts.create({
      title,
      body,
      category,
      tags,
      user: req.user._id,
      email: req.user.email,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const index = async (req, res) => {
  try {
    const post = await Posts.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indexId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category, tags } = req.body;
    const post = await Posts.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        title,
        body,
        category,
        tags,
      }
    );
    if (!post) {
      return res
        .status(404)
        .json({ message: `cannot find any posts with ID ${id}` });
    }
    const newPost = await Posts.findById(id);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.deleteOne({ _id: id, user: req.user._id });
    if (!post) {
      return res
        .status(404)
        .json({ message: `cannot find any posts with ID ${id}` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indexUser = async (req, res) => {
  try {
    const post = await Posts.find({ user: req.user._id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  index,
  update,
  indexId,
  destroy,
  indexUser,
};
