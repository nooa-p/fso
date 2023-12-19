import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [name, setName] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const nameChange = (e) => {
    setUserName(e.target.value)
  }

  const passChange = (e) => {
    setPassWord(e.target.value)
  }

  const logIn = (e) => {
    e.preventDefault()
    loginService
    .login(userName, passWord)
    .then(response => {
      setUser(response.token)
      setName(response.name)
      setBlogs(blogs.filter((blog) => blog.user.username === userName))
      })
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
      <p>{name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App