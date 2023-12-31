import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  const hideWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
  })  
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

  const logOut = () => {
    window.localStorage.removeItem('loggedUser')
    location.reload()
  }

  const newBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setFormVisible(false)
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

  const addLike = async (oldblog) => {
    try {
      oldblog.likes = oldblog.likes + 1
      const blog = await blogService.update(oldblog)
      const index = blogs.indexOf(oldblog)
      const newBlogs = blogs.map((b, i) => {
        if (index === i) {
          return blog
        } else {
          return b
        }
      })
      setBlogs(newBlogs) 
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

  const blogsToShow = user
    ? blogs.sort((a, b) => b.likes - a.likes).filter(blog => blog.user.id === user.id || blog.user === user.id)
    : blogs

  if (user === null) {
    return <Login errorMessage={errorMessage} handleSubmit={logIn} handleName={changeName} handlePass={changePass} username={userName} password={passWord} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{errorMessage}</h3>
      <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setFormVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
      <BlogForm handleBlog={newBlog} />
      <button onClick={() => setFormVisible(false)}>cancel</button>
      </div>
      <BlogList blogs={blogsToShow} addLike={addLike} />
    </div>
  )
}

export default App