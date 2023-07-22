const Posts = require("../../models/posts/posts");

const create = async (req, res) => {
  try {
    const posts = await Posts.create(req.body);
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
    const post = await Posts.findByIdAndUpdate(id, req.body);
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
    const post = await Posts.findByIdAndDelete(id);
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

module.exports = {
  create,
  index,
  update,
  indexId,
  destroy,
};
