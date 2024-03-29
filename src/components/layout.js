/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import "normalize.css"
import layoutStyles from "./layout.module.css"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, section }) => {
  return (
    <div className={layoutStyles.layout}>
      <Header section={section} />
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
