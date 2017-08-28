import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Modal from 'react-modal'
import { votePosts, removePost } from '../actions/post-actions'
import ThumbsUp from 'react-icons/lib/fa/thumbs-up'
import ThumbsDown from 'react-icons/lib/fa/thumbs-down'

class Post extends Component {

  state = {
    confirmModalOpen: false
  }

  openConfirmModal = () => this.setState(() => ({ confirmModalOpen: true }))
  closeConfirmModal = () => this.setState(() => ({ confirmModalOpen: false }))

  render() {
    const { post, vote, removePost, goHome } = this.props
    const { confirmModalOpen } = this.state

    return (
      <div className="blog-post">
        <h4><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h4>
        <h5><small>{moment(post.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</small></h5>
        <p>{post.body}</p>
        <ul className="menu simple margin-bottom">
          <li><Link to={`/edit/${post.id}`}>Edit</Link></li>
          <li><a onClick={this.openConfirmModal}>Delete</a></li>
        </ul>
        <div className="callout">
          <ul className="menu simple">
            <li><b>Author:</b> {post.author}</li>
            <li><b>Category:</b> {post.category}</li>
            <li><b>Comments:</b> {post.comments ? post.comments.length : 0}</li>
            <li><b>Votes:</b> {post.voteScore}</li>
            <li>
              <button onClick={() => vote(post.id, 'upVote')} className="icon-btn">
                <ThumbsUp size={15} />
              </button>
            </li>
            <li>
              <button onClick={() => vote(post.id, 'downVote')} className="icon-btn">
                <ThumbsDown size={15} />
              </button>
            </li>
          </ul>
        </div>
        <hr/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'
        >
          <h5>Confirm Delete Post</h5>
          <hr/>
          <div className="row">
            <div className="medium-12 columns">
              <label>Are you sure you wish to delete the post?</label>
            </div>
          </div>
          <div className="row">
            <div className="medium-12 columns">
              <button
                className="button float-right margin-left alert"
                onClick={() => {
                  removePost(post.id)
                  this.closeConfirmModal()
                  goHome && goHome()
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
  vote: (id, option) => dispatch(votePosts(id, option)),
  removePost: (id) => dispatch(removePost(id))
})

export default connect(
  null,
  mapDispatchToProps
)(Post)
