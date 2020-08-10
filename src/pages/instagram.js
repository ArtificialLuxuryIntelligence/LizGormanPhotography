import React from "react"

import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import styles from "./instagram.module.scss"

function Instagram() {
  const data = useStaticQuery(graphql`
    query {
      allInstaNode(limit: 24) {
        nodes {
          id
          username
          caption
          localFile {
            childImageSharp {
              fluid(maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)
  return (
    <Layout section={"insta"}>
      <SEO title="Instagram" />
      {/* <h1>Instagram</h1> */}
      <div className={styles.gridContainer}>
        {data.allInstaNode.nodes.map(node => {
          console.log(node)
          return (
            <Img
              imgStyle={{
                objectFit: "cover",
              }}
              fluid={node.localFile.childImageSharp.fluid}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default Instagram
