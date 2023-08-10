import React from "react"

import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import styles from "./instagram.module.scss"

//graphql filter video previews (?):   filter: { mediaType: { ne: "GraphVideo" } }

function Instagram() {
  const data = useStaticQuery(graphql`
    query {
      allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 36) {
        nodes {
          id
          mediaType
          timestamp
          localFile {
            childImageSharp {
              fluid(maxWidth: 300, maxHeight: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout section={"insta"}>
      <SEO title="Instagram" />
      <h1>
        <a
          href="https://www.instagram.com/lizmakesphotos"
          target="_blank"
          rel="noreferrer"
        >
          @lizmakesphotos
        </a>
      </h1>
      <div className={styles.gridContainer}>
        {data.allInstaNode.nodes.map(node => {
          if (!node.localFile) {
            return
          }
          return (
            <div key={node.id}>
              <a
                href={`https://www.instagram.com/p/${node.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <Img
                  imgStyle={{
                    objectFit: "cover",
                  }}
                  fluid={node.localFile.childImageSharp.fluid}
                />
              </a>
            </div>
          )
        })}
      </div>
      <div className={styles.bottomLink}>
        <a
          href="https://www.instagram.com/lizmakesphotos"
          target="_blank"
          rel="noreferrer"
        >
          See more @lizmakesphotos
        </a>
      </div>
    </Layout>
  )
}

export default Instagram
