const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postsController = require("./controllers/posts/posts");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Send post
app.post("/api/posts", postsController.create);

// Get all posts
app.get("/api/posts", postsController.index);

// Get single post
app.get("/api/posts/:id", postsController.indexId);

// Find and update post
app.put("/api/posts/:id", postsController.update);

// Delete post
app.delete("/api/posts/:id", postsController.destroy);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, () => {
      // Perform a database connection when server starts
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
