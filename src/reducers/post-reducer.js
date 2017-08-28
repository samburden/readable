import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  DELETE_POST,
  DOWNVOTE_POST,
  UPVOTE_POST
}  from '../actions/post-actions'

import {
  CREATE_COMMENT,
  EDIT_COMMENT,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT,
  DELETE_COMMENT
}  from '../actions/comment-actions'

export const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts.reduce((posts, post) => {
        posts[post.id] = post
        return posts
      }, {})
    case DOWNVOTE_POST:
      if (state[action.id]) {
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            voteScore: state[action.id].voteScore - 1
          }
        }
      } else {
        return state
      }
    case UPVOTE_POST:
      if (state[action.id]) {
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            voteScore: state[action.id].voteScore + 1
          }
        }
      } else {
        return state
      }
    case DELETE_POST:
      delete state[action.id]
      return state
    default:
      return state
  }
}

export const post = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return {
        ...action.post,
        comments: action.comments.reduce((comments, comment) => {
          comments[comment.id] = comment
          return comments
        }, {})
      }
    case CREATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      }
    case DOWNVOTE_POST:
      if (action.id === state.id) {
        return {
          ...state,
          voteScore: state.voteScore - 1
        }
      } else {
        return state
      }
    case UPVOTE_POST:
      if (action.id === state.id) {
        return {
          ...state,
          voteScore: state.voteScore + 1
        }
      } else {
        return state
      }
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.id]: {
            ...state.comments[action.id],
            voteScore: state.comments[action.id].voteScore - 1
          }
        }
      }
    case UPVOTE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.id]: {
            ...state.comments[action.id],
            voteScore: state.comments[action.id].voteScore + 1
          }
        }
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        }
      }
    case DELETE_COMMENT:
      delete state.comments[action.id]
      return state
    default:
      return state
  }
}
