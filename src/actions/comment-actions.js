import {
  saveNewComment,
  saveComment,
  deleteComment,
  updateCommentVotes
} from '../utils/api'
import { toggleLoading } from './loading-actions'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'

const newComment = comment => ({
  type: CREATE_COMMENT,
  comment
})

const editCommentAction = comment => ({
  type: EDIT_COMMENT,
  comment
})

const removeCommentAction = id => ({
  type: DELETE_COMMENT,
  id
})

const voteCommentAction = (id, type) => ({
  type: type,
  id
})

export const createComment = (comment) => dispatch => {
  dispatch(toggleLoading())

  return saveNewComment(comment)
      .then(() => dispatch(newComment(comment)))
      .then(() => dispatch(toggleLoading()))
}

export const editComment = (comment) => dispatch => {
  dispatch(toggleLoading())

  return saveComment(comment)
      .then(() => dispatch(editCommentAction(comment)))
      .then(() => dispatch(toggleLoading()))
}

export const removeComment = (id) => dispatch => {
  dispatch(toggleLoading())

  return deleteComment(id)
      .then(() => dispatch(removeCommentAction(id)))
      .then(() => dispatch(toggleLoading()))
}

export const voteComments = (id, option) => dispatch => {
  dispatch(toggleLoading())

  return updateCommentVotes(id, option)
      .then(() => dispatch(
        voteCommentAction(id, option === 'upVote' ? UPVOTE_COMMENT : DOWNVOTE_COMMENT))
      )
      .then(() => dispatch(toggleLoading()))
}
