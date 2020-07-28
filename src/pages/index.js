import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import "normalize.css"
import indexStyles from "./index.module.scss"

const IndexPage = ({ data }) => {
  const [lActive, setLActive] = useState(false)
  const [rActive, setRActive] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (
      "ontouchstart" in document.documentElement &&
      window.screen.width <= 1200
    ) {
      setIsTouch(true)
      console.log("touch")
    }
  }, [])

  return (
    <div className={indexStyles.pageContainer}>
      <SEO title="Home" />
      <div className={indexStyles.fullPageContainer}>
        {/* logo */}
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
      {/* guide tabs */}
      {/* <div className={indexStyles.tabs}> */}
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
      {/* </div> */}

      <div className={`${indexStyles.linkContainer}`}>
        <Link
          to="/art/"
          className={lActive ? indexStyles.linkActive : ""}
          onMouseEnter={() => setLActive(true)}
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
            fluid={data.allFile.edges[1].node.childImageSharp.fluid}
          />
        </Link>

        <Link
          to="/commercial/"
          className={rActive ? indexStyles.linkActive : ""}
          onMouseEnter={() => setRActive(true)}
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
            fluid={data.allFile.edges[0].node.childImageSharp.fluid}
          />
        </Link>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "index" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
