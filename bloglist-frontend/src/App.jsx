import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import userService from "./services/userService";

const App = () => {
  // 1 state
  const [blogs, setBlogs] = useState([]);
  // 2 state
  const [user, setUser] = useState(null);
  // 3 state
  const [username, setUsername] = useState("");
  // 4 state
  const [password, setPassword] = useState("");
  // 5 state
  const [errorMessage, setErrorMessage] = useState(null);

  const userServices = userService();
  const blogServices = blogService();

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (!loggedUser) return;
    const user = JSON.parse(loggedUser);
    setUser(user);
    blogServices.setToken(user.token);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userServices.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogServices.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const doLogOut = async () => {
    setUser(null);
    window.localStorage.clear();
  };

  const loginForm = () => {
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  /*   const blogForm = () => {
    return (
      <div>
        <form>
          <div>
            <label>
              title: <input type="text" name="" id="" />
            </label>
          </div>
          <div>
            <label>
              author: <input type="text" name="" id="" />
            </label>
          </div>
          <div>
            <label>
              url: <input type="text" name="" id="" />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }; */

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <span>{user.name} is logged in</span>
          <button onClick={doLogOut}>log out</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {/*  {blogForm()} */}
        </div>
      )}
    </div>
  );
};

export default App;
