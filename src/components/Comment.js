import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { voteComments, editComment, removeComment } from '../actions/comment-actions'
import Modal from 'react-modal'
import ThumbsUp from 'react-icons/lib/fa/thumbs-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-down'
import serializeForm from 'form-serialize'

class Comment extends Component {

  state = {
    modalOpen: false,
    confirmModalOpen: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    let comment = {
      ...this.props.comment,
      ...values,
      timestamp: moment().valueOf()
    }

    this.props.editComment(comment).then(() => {
      this.closeModal()
    })
  }

  openModal = () => this.setState(() => ({ modalOpen: true }))
  closeModal = () => this.setState(() => ({ modalOpen: false }))
  openConfirmModal = () => this.setState(() => ({ confirmModalOpen: true }))
  closeConfirmModal = () => this.setState(() => ({ confirmModalOpen: false }))

  render() {
    const { comment, vote, removeComment } = this.props
    const { modalOpen, confirmModalOpen } = this.state

    return (
      <div className="blog-post">
        <p>{comment.body}</p>
        <ul className="menu simple margin-bottom">
          <li><a onClick={this.openModal}>Edit</a></li>
          <li><a onClick={this.openConfirmModal}>Delete</a></li>
        </ul>
        <div className="callout">
          <ul className="menu simple">
            <li><b>Date:</b> {moment(comment.timestamp).format("MM/DD/YYYY h:mm:ss a")}</li>
            <li><b>Author:</b> {comment.author}</li>
            <li><b>Votes:</b> {comment.voteScore}</li>
            <li>
              <button onClick={() => vote(comment.id, 'upVote')} className="icon-btn">
                <ThumbsUp size={15} />
              </button>
            </li>
            <li>
              <button onClick={() => vote(comment.id, 'downVote')} className="icon-btn">
                <ThumbsDown size={15} />
              </button>
            </li>
          </ul>
        </div>
        <hr/>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <h5>Edit Comment</h5>
          <hr/>
          <form onSubmit={this.handleSubmit} ref={(f) => this.commentForm = f}>
            <div className="row">
              <div className="medium-12 columns">
                <label>Comment
                  <textarea placeholder="Comment" name="body" defaultValue={comment.body}/>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <button className="button float-right margin-left">Save</button>
                <button
                  className="button float-right secondary"
                  onClick={this.closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'
        >
          <h5>Confirm Delete Comment</h5>
          <hr/>
          <div className="row">
            <div className="medium-12 columns">
              <label>Are you sure you wish to delete the comment?</label>
            </div>
          </div>
          <div className="row">
            <div className="medium-12 columns">
              <button
                className="button float-right margin-left alert"
                onClick={() => {
                  removeComment(comment.id)
                  this.closeConfirmModal()
                }}
              >
                  Delete
              </button>
              <button
                className="button float-right secondary"
                onClick={this.closeConfirmModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  vote: (id, option) => dispatch(voteComments(id, option)),
  editComment: (comment) => dispatch(editComment(comment)),
  removeComment: (id) => dispatch(removeComment(id))
})

export default connect(
  null,
  mapDispatchToProps
)(Comment)
