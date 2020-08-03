import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.scss"

const Header = () => (
  <header className={styles.header}>
    <h1 style={{ margin: 0 }}>
      <Link to="/" className={styles.logo}>
        <span>Liz Gorman Photography</span>
      </Link>
    </h1>
    <nav>
      <ul>
        <li>
          <Link to="/art">projects</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>{" "}
        <li>
          <Link to="/commercial">{true && "commercial"}</Link>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
