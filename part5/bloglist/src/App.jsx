import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const newBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: Math.floor(Math.random() * 200)
    }

    blogService
    .create(newBlog)
    .then(returned => {
      setBlogs(blogs.concat(returned))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={logIn}>
          username <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /> <br />
          password <input type="password" value={passWord} onChange={(e) => setPassWord(e.target.value)} /> <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
          title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
          author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/> <br />
          url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /> <br />
          <button type="submit">create</button>
      </form>
      {blogs.filter(blog => blog.user.username === user.username).map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App