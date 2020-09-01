import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import "normalize.css"
import indexStyles from "./index.module.scss"

const IndexPage = ({ data }) => {
  const [lActive, setLActive] = useState(false)
  const [rActive, setRActive] = useState(false)

  return (
    <div className={indexStyles.pageContainer}>
      <SEO title="Home" />
      {/* logo (name) container */}
      <div className={indexStyles.logoContainer}>
        <div
          className={`${indexStyles.logo} ${
            lActive || rActive ? indexStyles.active : ""
          }`}
        >
          <h1>Liz Gorman </h1>
          <h1>{lActive ? "art" : rActive ? "commercial" : ""}</h1>
          <h1>Photography</h1>
        </div>
      </div>
      {/* link image containers */}
      <div className={`${indexStyles.linkContainer}`}>
        <Link
          to="/art/"
          className={lActive ? indexStyles.linkActive : ""}
          onMouseOver={() => setLActive(true)}
          onMouseLeave={() => setLActive(false)}
          // onTouchEnd={() => {
          //   setLActive(true)
          //   setRActive(false)
          // }}
        >
          <Img
            className={indexStyles.gatsbyImage}
            imgStyle={{
              objectFit: "cover",
            }}
            fluid={data.allFile.edges[0].node.childImageSharp.fluid}
          />
        </Link>

        <Link
          to="/commercial/"
          className={rActive ? indexStyles.linkActive : ""}
          onMouseOver={() => setRActive(true)}
          onMouseLeave={() => setRActive(false)}
          // onTouchEnd={() => {
          //   setRActive(true)
          //   setLActive(false)
          // }}
        >
          <Img
            className={indexStyles.gatsbyImage}
            imgStyle={{
              objectFit: "cover",
            }}
            fluid={data.allFile.edges[1].node.childImageSharp.fluid}
          />
        </Link>
      </div>
      {/* tabs */}
      <h2
        className={
          rActive
            ? `${indexStyles.tabActive} ${indexStyles.leftTab}`
            : indexStyles.leftTab
        }
      >
        ART
      </h2>
      <h2
        className={
          lActive
            ? `${indexStyles.tabActive} ${indexStyles.rightTab}`
            : indexStyles.rightTab
        }
      >
        COMMERCIAL
      </h2>
    </div>
  )
}

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "index" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
