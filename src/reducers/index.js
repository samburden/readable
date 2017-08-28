import { combineReducers } from 'redux'
import { categories } from './category-reducer'
import { posts, post } from './post-reducer'
import { loading } from './loading-reducer'

export default combineReducers({
  categories,
  posts,
  post,
  loading
})
