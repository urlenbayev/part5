const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


test('total likes', () => {
  const blogs = [
    {
      "title": "Introduction to MongoDB",
      "author": "John Doe",
      "url": "https://example.com/mongodb-intro",
      "likes": 15,
      "id": "66917cb6dda6d7bed93e0618"
    },
    {
      "title": "Node.js Best Practices",
      "author": "Jane Smith",
      "url": "https://example.com/nodejs-best-practices",
      "likes": 23,
      "id": "66917cb6dda6d7bed93e0619"
    },
    {
      "title": "React Hooks Tutorial",
      "author": "Alice Johnson",
      "url": "https://example.com/react-hooks-tutorial",
      "likes": 30,
      "id": "66917cb6dda6d7bed93e061a"
    },
    {
      "title": "JavaScript ES6 Features",
      "author": "Bob Brown",
      "url": "https://example.com/javascript-es6-features",
      "likes": 18,
      "id": "66917cb6dda6d7bed93e061b"
    },
    {
      "title": "CSS Grid Layout Explained",
      "author": "Emily Davis",
      "url": "https://example.com/css-grid-layout",
      "likes": 12,
      "id": "66917cb6dda6d7bed93e061c"
    },
    {
      "title": "Python Data Analysis",
      "author": "Michael Clark",
      "url": "https://example.com/python-data-analysis",
      "likes": 25,
      "id": "66917cb6dda6d7bed93e061d"
    },
    {
      "title": "Docker Containerization",
      "author": "Samuel White",
      "url": "https://example.com/docker-containerization",
      "likes": 17,
      "id": "66917cb6dda6d7bed93e061e"
    },
    {
      "title": "AWS Cloud Services",
      "author": "Sophia Lee",
      "url": "https://example.com/aws-cloud-services",
      "likes": 21,
      "id": "66917cb6dda6d7bed93e061f"
    },
    {
      "title": "Machine Learning Basics",
      "author": "David Garcia",
      "url": "https://example.com/machine-learning-basics",
      "likes": 28,
      "id": "66917cb6dda6d7bed93e0620"
    },
    {
      "title": "Web Security Fundamentals",
      "author": "Olivia Moore",
      "url": "https://example.com/web-security-fundamentals",
      "likes": 19,
      "id": "66917cb6dda6d7bed93e0621"
    },
    {
      "title": "Learning Functional Programming with Scala",
      "author": "Ryan Susana",
      "url": "https://ryansusana.medium.com/learning-functional-programming-with-scala-ccc7bf68214f",
      "likes": 99,
      "id": "669181afebaf171820871bbb"
    },
    {
      "title": "Why use Scala for building backend applications?",
      "author": "JAROSLAV REGEC",
      "url": "https://scalac.io/blog/why-use-scala/",
      "likes": 1,
      "id": "66918352dba68e0e8fa81e2b"
    }
  ]

  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 308)
})