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
  const [errorMessage, setErrorMessage] = useState(null)
  const [showedBlogs, setShowedBlogs] = useState([])

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

  useEffect(() => {
    setShowedBlogs(blogs.filter(blog => blog.user.username === user.username))
  }, [blogs])

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
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = (e) => {
    window.localStorage.removeItem('loggedUser')
    location.reload()
  }

  const newBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: Math.floor(Math.random() * 200)
      }
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <h3>{errorMessage}</h3>
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
      <h3>{errorMessage}</h3>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
          title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
          author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/> <br />
          url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /> <br />
          <button type="submit">create</button>
      </form>
      {showedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App