const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const api = supertest(app)

//When there is initially one user in db
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test.only('creation succeeds with a fresh username', async () => {
  const users = await User.find({})
  const usersDb = users.map(_ => _.toJSON())

  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAfter = await User.find({})
  const usersAfterDb = usersAfter.map(_ => _.toJSON())

  assert.strictEqual(usersDb.length, usersAfterDb.length - 1)

  const usernames = usersAfterDb.map(_ => _.username)
  assert(usernames.includes(newUser.username))
})

after(async () => {
  await mongoose.connection.close()
})