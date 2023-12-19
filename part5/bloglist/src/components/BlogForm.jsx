import { useState } from 'react'

const BlogForm = ({
  handleBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handleBlog({
      title: title,
      author: author,
      url: url,
      likes: Math.floor(Math.random() * 200)
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={addBlog}>
          title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
          author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/> <br />
          url: <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /> <br />
          <button type="submit">create</button> <br />
      </form>
    </>
  )
}

export default BlogForm