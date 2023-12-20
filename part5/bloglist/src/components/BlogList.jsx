import Blog from './Blog'

const BlogList = ({ blogs, addLike }) => {
  return blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} />)
}

export default BlogList