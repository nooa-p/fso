import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const auth = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, auth)
  return response.data
}

const update = async newBlog => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return response.data
}

export default { getAll, create, update, setToken }