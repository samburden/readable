import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllPosts, fetchPosts } from '../actions/post-actions'
import sortBy from 'sort-by'
import Post from './Post'

class ListPosts extends Component {

  state = {
    sortBy: 'votesDec'
  }

  retrievePosts = (category) => {
    if (category) {
      this.props.getPosts(category)
    } else {
      this.props.getAllPosts()
    }
  }

  componentDidMount() {
      this.retrievePosts(this.props.match.params.category)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.category !== newProps.match.params.category) {
      this.retrievePosts(newProps.match.params.category)
    }
  }

  changeSortBy = (newSortBy) => {
    this.setState({sortBy: newSortBy})
  }

  render() {
    const { posts } = this.props
    const category = this.props.match.params.category || 'All'

    const sortedPosts = posts || []
    switch (this.state.sortBy) {
      case 'votesAsc':
        sortedPosts.sort(sortBy('voteScore'))
        break
      case 'dateAsc':
        sortedPosts.sort(sortBy('timestamp'))
        break
      case 'dateDes':
        sortedPosts.sort(sortBy('-timestamp'))
        break
      default:
        sortedPosts.sort(sortBy('-voteScore'))
    }

    return (
      <div>
        <div className="callout primary">
          <div className="row column text-center">
            <h3>{category} Posts</h3>
          </div>
        </div>

        <div className="row medium-8 large-7 columns">
          <div className="row">
            <div className="medium-5 small-12 columns">
              <Link to={category !== 'All' ? `/create/${category}` : "/create"}>
                <button className="button primary">New Post</button>
              </Link>
            </div>
            <div className="medium-2 small-4 columns">
              <label className="text-right middle">Sort By:</label>
            </div>
            <div className="medium-5 small-8 columns">
              <select onChange={(event) => this.changeSortBy(event.target.value)}>
                <option value="votesDec">Votes (Most to Least)</option>
                <option value="votesAsc">Votes (Least to Most)</option>
                <option value="dateDes">Date (Newest to Oldest)</option>
                <option value="dateAsc">Date (Oldest to Newest)</option>
              </select>
            </div>
          </div>
          {/* Had to check for deleted flag due to bug in API */}
          {sortedPosts.map((post) => !post.deleted && (
            <Post post={post} key={post.id}/>
          ))}
          {sortedPosts.length === 0 && (
            <div className="text-center">No posts to display</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: Object.keys(posts).reduce((_posts, post) => {
    _posts.push(posts[post])
    return _posts
  }, [])
})

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: () => dispatch(fetchAllPosts()),
  getPosts: (category) => dispatch(fetchPosts(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
