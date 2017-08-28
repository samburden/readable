import { TOGGLE_LOADING }  from '../actions/loading-actions'

export const loading = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return !state
    default:
      return state
  }
}
