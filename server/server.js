const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config.env" });

const postsController = require("./controllers/posts");
const usersController = require("./controllers/users");
const commentsController = require("./controllers/comments");
const requireAuth = require("./middleware/requireAuth");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Create post
app.post("/api/posts", requireAuth, postsController.create);

// Get user posts
app.get("/api/myposts", requireAuth, postsController.indexUser);

// Get all posts
app.get("/api/posts", requireAuth, postsController.index);

// Get single post
app.get("/api/posts/:id", requireAuth, postsController.indexId);

// Find and update post
app.put("/api/posts/:id", requireAuth, postsController.update);

// Delete post
app.delete("/api/posts/:id", requireAuth, postsController.destroy);

// Likes post
app.put("/api/like/:id", requireAuth, postsController.like);

// Create comment
app.post("/api/comment", requireAuth, commentsController.create);

// Delete comment
app.delete("/api/comment/:id", requireAuth, commentsController.destroy);

// Get comments my post
app.get("/api/comment/:id", requireAuth, commentsController.indexPost);

// Create user
app.post("/api/signup", usersController.create);

// Login user
app.post("/api/login", usersController.login);

// Logout user
app.get("/api/logout", usersController.logout);

// Middleware
app.get("/api/check-auth", requireAuth, usersController.checkAuth);

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
