import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'foundation-sites/dist/css/foundation.min.css'
import 'foundation-sites/dist/css/foundation-float.min.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
