const BlogForm = ({
  handleBlog,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={handleBlog}>
          title: <input type="text" value={title} onChange={handleTitle} /> <br />
          author: <input type="text" value={author} onChange={handleAuthor}/> <br />
          url: <input type="text" value={url} onChange={handleUrl} /> <br />
          <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm