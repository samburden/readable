import { getCategories } from '../utils/api'
import { toggleLoading } from './loading-actions'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dispatch(toggleLoading())

  return getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
    .then(() => dispatch(toggleLoading()))
}
