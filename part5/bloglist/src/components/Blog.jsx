import { useState } from "react"

const Blog = ({ blog, addLike }) => {
  const [show, setShow] = useState(false)
  const hideWhenVisible = { display: show ? 'none' : '' }
  const showWhenVisible = { display: show ? '' : 'none' }

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }
  
  return (
  <div style={blogStyle}>
    {blog.title} <button style={hideWhenVisible} onClick={() => setShow(true)}>show</button>
    <button style={showWhenVisible} onClick={() => setShow(false)}>hide</button>
    <div style={showWhenVisible}>
      {blog.url} <br />
      {blog.likes} <button onClick={() => addLike(blog)}>like</button> <br />
      {blog.author}
    </div>
  </div>  
  )
}

export default Blog