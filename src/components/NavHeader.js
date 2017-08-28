import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { fetchCategories } from '../actions/category-actions'
import {
  TopBar,
  TopBarTitle,
  TopBarLeft,
  Menu,
  MenuItem
} from 'react-foundation'

class NavHeader extends Component {

  componentDidMount() {
      this.props.getCategories()
  }

  render() {
    const { categories } = this.props

    return (
      <TopBar>
        <TopBarTitle className="title-bar-title">
          <Link to="/" className="header-link">Readable</Link>
        </TopBarTitle>
        <TopBarLeft>
          <Menu>
              {categories.map((category) => (
                <MenuItem key={category.name}>
                  <NavLink
                    to={`/${category.path}`}
                    activeClassName="is-active"
                    >
                    {category.name}
                  </NavLink>
                </MenuItem>
              ))}
          </Menu>
        </TopBarLeft>
      </TopBar>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader)
