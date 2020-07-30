import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.scss"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <h1 style={{ margin: 0 }}>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
