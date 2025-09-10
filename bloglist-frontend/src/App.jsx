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

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  useEffect(() => {
    if (errorMessage) window.alert(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, [errorMessage]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userServices.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogServices.setToken(user.token);

      setUser(user);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setUsername("");
      setPassword("");
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
                id="username"
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
                id="password"
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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const result = await blogServices.create(newBlog);
      setBlogs(blogs.concat(result));
      window.alert("Success! A new blog added.");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      setAuthor("");
      setTitle("");
      setUrl("");
    }
  };

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
            <label>
              title:
              <input
                id="title"
                type="text"
                value={title}
                onChange={({ target }) => {
                  setTitle(target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                id="author"
                type="text"
                value={author}
                onChange={({ target }) => {
                  setAuthor(target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                id="url"
                type="text"
                value={url}
                onChange={({ target }) => {
                  setUrl(target.value);
                }}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <span>{user.name} is logged in</span>
          <button onClick={doLogOut}>log out</button>

          <h2>Create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
