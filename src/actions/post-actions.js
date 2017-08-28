import {
  getAllPosts,
  getPosts,
  getPostById,
  saveNewPost,
  savePost,
  deletePost,
  updatePostVotes,
  getPostComments
} from '../utils/api'
import { toggleLoading } from './loading-actions'

export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

const receivePost = (post, comments) => ({
  type: RECEIVE_POST,
  post,
  comments
})

const newPost = post => ({
  type: CREATE_POST,
  post
})

const editPostAction = post => ({
  type: EDIT_POST,
  post
})

const removePostAction = id => ({
  type: DELETE_POST,
  id
})

const votePostAction = (id, type) => ({
  type: type,
  id
})

export const fetchAllPosts = () => dispatch => {
  dispatch(toggleLoading())

  return getAllPosts()
    .then(posts => Promise.all(posts.map(post => getPostComments(post.id)))
        .then(commentList => posts.map((post, i) => {
          post.comments = commentList[i]
          return post
        }))
        .then(posts => dispatch(receivePosts(posts)))
        .then(() => dispatch(toggleLoading()))
    )
}

export const fetchPosts = (category) => dispatch => {
  dispatch(toggleLoading())

  return getPosts(category)
    .then(posts => Promise.all(posts.map(post => getPostComments(post.id)))
        .then(commentList => posts.map((post, i) => {
          post.comments = commentList[i]
          return post
        }))
        .then(posts => dispatch(receivePosts(posts)))
        .then(() => dispatch(toggleLoading()))
    )
}

export const fetchPost = (id) => dispatch => {
  dispatch(toggleLoading())

  return getPostById(id)
    .then(post => {
      post.error = !post || !post.id || post.deleted ? 'notfound' : ''
      return getPostComments(id)
        .then(comments => dispatch(receivePost(post, comments)))
        .then(() => dispatch(toggleLoading()))
    })
}

export const createPost = (post) => dispatch => {
  dispatch(toggleLoading())

  return saveNewPost(post)
      .then(() => dispatch(newPost(post)))
      .then(() => dispatch(toggleLoading()))
}

export const editPost = (post) => dispatch => {
  dispatch(toggleLoading())

  return savePost(post)
      .then(() => dispatch(editPostAction(post)))
      .then(() => dispatch(toggleLoading()))
}

export const removePost = (id) => dispatch => {
  dispatch(toggleLoading())

  return deletePost(id)
      .then(() => dispatch(removePostAction(id)))
      .then(() => dispatch(toggleLoading()))
}

export const votePosts = (id, option) => dispatch => {
  dispatch(toggleLoading())

  return updatePostVotes(id, option)
      .then(() => dispatch(
        votePostAction(id, option === 'upVote' ? UPVOTE_POST : DOWNVOTE_POST))
      )
      .then(() => dispatch(toggleLoading()))
}
