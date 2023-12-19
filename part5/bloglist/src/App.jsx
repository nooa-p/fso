import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
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
      setBlogs([...blogs, blog])
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

  const changeName = (e) => {
    setUserName(e.target.value)
  }

  const changePass = (e) => {
    setPassWord(e.target.value)
  }

  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const changeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const changeUrl = (e) => {
    setUrl(e.target.value)
  }

  if (user === null) {
    return <Login errorMessage={errorMessage} handleSubmit={logIn} handleName={changeName} handlePass={changePass} username={userName} password={passWord} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{errorMessage}</h3>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <BlogForm handleBlog={newBlog} title={title} handleTitle={changeTitle} author={author} handleAuthor={changeAuthor} url={url} handleUrl={changeUrl} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App