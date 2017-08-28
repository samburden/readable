const API = 'http://localhost:5001'
const API_TOKEN = 'sburden24811'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_TOKEN
}
// Category endpoints
export const getCategories = () =>
  fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// Post endpoints
export const getAllPosts = () =>
  fetch(`${API}/posts`, { headers })
    .then(res => res.json())

export const getPosts = (category) =>
  fetch(`${API}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPostById = (id) =>
  fetch(`${API}/posts/${id}`, { headers })
    .then(res => res.json())

export const getPostComments = (id) =>
  fetch(`${API}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const saveNewPost = (post) =>
  fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const savePost = (post) =>
  fetch(`${API}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => {})

export const updatePostVotes = (id, option) =>
  fetch(`${API}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

// Comment endpoints
export const saveNewComment = (comment) =>
  fetch(`${API}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const updateCommentVotes = (id, option) =>
  fetch(`${API}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())

export const saveComment = (comment) =>
  fetch(`${API}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${API}/comments/${id}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())
