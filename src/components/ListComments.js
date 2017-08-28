import React, { Component } from 'react'
import sortBy from 'sort-by'
import Comment from './Comment'

class ListComments extends Component {

  state = {
    sortBy: 'votesDec'
  }

  changeSortBy = (newSortBy) => {
    this.setState({sortBy: newSortBy})
  }

  render() {
    const { comments } = this.props

    const sortedComments = comments || []
    switch (this.state.sortBy) {
      case 'votesAsc':
        sortedComments.sort(sortBy('voteScore'))
        break
      case 'dateAsc':
        sortedComments.sort(sortBy('timestamp'))
        break
      case 'dateDes':
        sortedComments.sort(sortBy('-timestamp'))
        break
      default:
        sortedComments.sort(sortBy('-voteScore'))
    }

    return (
      <div>
        <div className="row">
          <div className="medium-5 small-12 columns">
            <h5>Comments<small>({sortedComments.length})</small></h5>
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
        {sortedComments.map((comment) => (
          <Comment comment={comment} key={comment.id}/>
        ))}
        {sortedComments.length === 0 && (
          <div className="text-center">No comments to display</div>
        )}
      </div>
    )
  }
}

export default ListComments
