export default function LoginForm({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) {
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
                handleUsernameChange(target.value);
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
                handlePasswordChange(target.value);
              }}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
