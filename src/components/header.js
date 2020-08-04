import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.scss"

const Header = ({ section }) => {
  const other = section === "commercial" ? "art" : "commercial"
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.logo}>
          <span>Liz Gorman</span> <span>Photography</span>{" "}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={`/${section}`}>projects</Link>
          </li>
          <li>
            <Link to={`/${section}-about`}>about</Link>
          </li>
          <li>
            <Link to={`/${other}`}>{other}</Link>
          </li>
          <li>
            <Link to="/instagram">instagram</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
