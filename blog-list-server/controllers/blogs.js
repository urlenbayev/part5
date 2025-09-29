require("dotenv").config();
const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//GET http://localhost:3001/api/blogs
//Result is an array of blogs with title, author, url and likes
/* 
[
 {
    "title": "asdsa",
    "author": "sadsad",
    "url": "sadad",
    "likes": 0,
    "user": {
      "username": "demo_user",
      "name": "Demo User",
      "id": "68d9afe636aa46d111177148"
    },
    "id": "68d9be4736aa46d11117717d"
  },
  ...
] 
*/
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate({
    path: "user",
    select: "username name id ",
  });
  res.json(blogs);
});

//POST http://localhost:3001/api/blogs
//For creating a blog
blogsRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);
  const token = getTokenFrom(req);
  if (/\d/.test(blog.author)) {
    return res
      .status(401)
      .json({ error: "Author name cannot contain digits." });
  }
  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    blog.user = user.id;

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);

    await user.save();
    const populatedBlog = await result.populate({
      path: "user",
      select: "username name id ",
    });
    res.status(201).json(populatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

/**
|--------------------------------------------------
GET /resource/:id?
Get resource
Example data
[
  {
  },
  ...
]
|--------------------------------------------------
*/

//PUT http://localhost:3001/api/blogs/:id
//For updating title, author, url and likes for a blog
blogsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params,
    { title, author, url, likes, user } = req.body,
    blog = { title, author, url, likes, user };

  try {
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//DELETE http://localhost:3001/api/blogs/:id
//To remove a certain blog
blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Blog.findByIdAndDelete(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
