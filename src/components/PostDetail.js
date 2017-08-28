import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost } from '../actions/post-actions'
import Post from './Post'
import CreateComment from './CreateComment'
import ListComments from './ListComments'
import NotFound from './NotFound'

class PostDetail extends Component {

  retrievePost = (id) => {
    this.props.getPost(id)
  }

  componentDidMount() {
      this.retrievePost(this.props.match.params.post_id)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.post_id !== newProps.match.params.post_id) {
      this.retrievePost(newProps.match.params.post_id)
    }
  }

  goHome = () => {
    this.props.history.push("/")
  }

  render() {
    const { post, comments } = this.props

    return (
      <div>
        {post.error === 'notfound'
        ? <NotFound/>
        : (
        <div className="row medium-8 large-7 columns">
          <div className="row">
            <div className="small-12 columns">
              <Link to={`/create/${post.category}`}>
                <button className="button primary margin-top float-right">New Post</button>
              </Link>
            </div>
          </div>
          <Post post={post} goHome={this.goHome}/>
          <CreateComment postId={post.id}/>
          <ListComments comments={comments}/>
        </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ post }) => ({
    post,
    comments: post.comments ? Object.keys(post.comments).reduce((_comments, id) => {
      _comments.push(post.comments[id])
      return _comments
    }, []) : []
})

const mapDispatchToProps = (dispatch) => ({
  getPost: (id) => dispatch(fetchPost(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
