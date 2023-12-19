import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const nameChange = (e) => {
    setUserName(e.target.value)
  }

  const passChange = (e) => {
    setPassWord(e.target.value)
  }

  const logIn = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login(userName, passWord)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassWord('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const logOut = (e) => {
    window.localStorage.removeItem('loggedUser')
    location.reload()
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={logIn}>
          username <input type="text" value={userName} onChange={nameChange} /> <br />
          password <input type="password" value={passWord} onChange={passChange} /> <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      {blogs.filter(blog => blog.user.username === user.username).map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App