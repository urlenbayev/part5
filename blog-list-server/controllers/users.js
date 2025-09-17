const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/User");

//GET http://localhost:3001/api/users
//Retrieve all users
/* 
[
  {
    "username": "mluukkai",
    "name": "Matti Luukkainen",
    "blogs": [
      "669d38537741c8486d0c14e9",
      "669d38757741c8486d0c14ee"
    ],
    "id": "669d30f99152d457f5002430"
  },
  ...
] 
  */
usersRouter.get("/", async (req, res) => {
  const result = await User.find({}).populate("blogs");
  res.json(result);
});

/**
|--------------------------------------------------
GET http://localhost:3001/api/users/:id
Get a certain user
Example data
[
  {
  "username": "mluukkai",
  "name": "Matti Luukkainen",
  "blogs": [
    "68c1da8bd42e574b47c8ddbd",
    ],
  "id": "669d331587bebcf6f5b9dd89"
  },
  ...
]
|--------------------------------------------------
*/
usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//POST http://localhost:3001/api/users
//To create a user with username, name and password
usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
