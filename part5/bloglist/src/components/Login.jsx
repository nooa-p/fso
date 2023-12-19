const Login = ({
  errorMessage,
  handleSubmit,
  handleName,
  handlePass,
  username,
  password
}) => {
  return (
    <div>
        <h2>log in to application</h2>
        <h3>{errorMessage}</h3>
        <form onSubmit={handleSubmit}>
          username <input type="text" value={username} onChange={handleName} /> <br />
          password <input type="password" value={password} onChange={handlePass} /> <br />
          <button type="submit">login</button>
        </form>
      </div>
  )
}

export default Login