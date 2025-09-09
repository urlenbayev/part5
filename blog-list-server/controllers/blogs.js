require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//GET http://localhost:3001/api/blogs
//Result is an array of blogs with title, author, url and likes
/* 
[
  {
    "title": "Why use Scala for building backend applications?",
    "author": "JAROSLAV REGEC",
    "url": "https://scalac.io/blog/why-use-scala/",
    "likes": 1,
    "user": "669d30f99152d457f5002430",
    "id": "669d38757741c8486d0c14ee"
  },
  ...
] 
*/
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})


//POST http://localhost:3001/api/blogs
//For creating a blog
blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)
  const token = getTokenFrom(req)

  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }
  
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    res.status(201).json(result)
  } catch(error) {
    next(error)
  }
})


//PUT http://localhost:3001/api/blogs/:id
//For updating title, author, url and likes for a blog
blogsRouter.put('/:id', async (req, res, next) => {
  const { id }  = req.params
  const blog = req.body 

  try {
    const result = await Blog.findByIdAndUpdate(id, blog, {new: true})
    res.status(200).json(result)
  } catch(error) {
    next(error)
  }
})


//DELETE http://localhost:3001/api/blogs/:id
//To remove a certain blog
blogsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await Blog.findByIdAndDelete(id)
    res.status(200).send(result)
  } catch(error) {
    next(error)
  }
})


module.exports = blogsRouter