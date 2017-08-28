import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../actions/comment-actions'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import serializeForm from 'form-serialize'

class CreateComment extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    let newComment = {
      ...values,
      id: uuidv4(),
      timestamp: moment().valueOf(),
      parentId: this.props.postId,
      voteScore: 0
    }

    this.props.createComment(newComment).then(() => {
      this.commentForm.reset()
    })
  }

  render() {

    return (
      <div className="blog-post">
          <h5>New Comment</h5>
          <form onSubmit={this.handleSubmit} ref={(f) => this.commentForm = f}>
            <div className="row">
              <div className="medium-6 columns">
                <label>Author
                  <input type="text" placeholder="Author" name="author"/>
                </label>
              </div>
              <div className="medium-6 columns">
                <label>Comment
                  <textarea placeholder="Comment" name="body"/>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <button className="button float-right">Save</button>
              </div>
            </div>
          </form>
          <hr/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment))
})

export default connect(
  null,
  mapDispatchToProps
)(CreateComment)
