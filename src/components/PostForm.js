import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost, editPost, fetchPost } from '../actions/post-actions'
import { fetchCategories } from '../actions/category-actions'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import serializeForm from 'form-serialize'

class PostForm extends Component {

  componentDidMount() {
      this.props.getCategories()
      const postId = this.props.match.params.post_id

      if (postId)
        this.props.getPost(postId)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.post_id &&
      this.props.match.params.post_id !== newProps.match.params.post_id) {
      this.props.getPost(newProps.match.params.post_id)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const postId = this.props.match.params.post_id

    if (postId) {
      let post = {
        ...this.props.post,
        ...values,
        timestamp: moment().valueOf()
      }

      this.props.editPost(post).then(() => {
        this.props.history.push(`/${post.category}/${post.id}`)
      })
    } else {
      let newPost = {
        ...values,
        id: uuidv4(),
        timestamp: moment().valueOf(),
        voteScore: 0
      }

      this.props.createPost(newPost).then(() => {
        this.props.history.push(`/${newPost.category}/${newPost.id}`)
      })
    }
  }

  render() {
    const { post, categories, history } = this.props
    const postId = this.props.match.params.post_id
    const category = this.props.match.params.category
    const formLabel = post && postId ? 'Edit' : 'New'
    const editPost = post && postId ? post : {category}
    const renderForm = !postId || (post && post.id && postId === post.id && postId)

    return (
      <div>
        {renderForm && (
          <div className="row medium-8 large-7 columns">
            <div className="blog-post">
                <h5>{formLabel} Post</h5>
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="medium-6 columns">
                      <label>Title
                        <input type="text" placeholder="Title" name="title" defaultValue={editPost.title}/>
                      </label>
                    </div>
                    <div className="medium-6 columns">
                      <label>Category
                        <select name="category" defaultValue={editPost.category}>
                          {categories.map((category) => (
                            <option key={category.name} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-6 columns">
                      <label>Author
                        <input type="text" placeholder="Author" name="author" defaultValue={editPost.author}/>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <label>Body
                        <textarea placeholder="Body" name="body" defaultValue={editPost.body}/>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="medium-12 columns">
                      <button className="button float-right margin-left">Save</button>
                      <button
                          type="button"
                          onClick={history.goBack}
                          className="button secondary float-right">
                          Cancel
                      </button>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ categories, post }) => ({
  categories,
  post
})

const mapDispatchToProps = (dispatch) => ({
  createPost: (comment) => dispatch(createPost(comment)),
  editPost: (comment) => dispatch(editPost(comment)),
  getPost: (id) => dispatch(fetchPost(id)),
  getCategories: () => dispatch(fetchCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
