import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import NavHeader from './NavHeader'
import ListPosts from './ListPosts'
import PostDetail from './PostDetail'
import PostForm from './PostForm'

class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" component={NavHeader} />
        <Switch>
          <Route exact path="/" component={ListPosts} />
          <Route exact path="/create/:category" component={PostForm} />
          <Route exact path="/create" component={PostForm} />
          <Route exact path="/edit/:post_id" component={PostForm} />
          <Route path="/:category/:post_id" component={PostDetail} />
          <Route path="/:category" component={ListPosts} />
        </Switch>
      </div>
    )
  }
}

export default App
