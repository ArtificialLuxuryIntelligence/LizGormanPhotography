import React from "react"

import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import styles from "./instagram.module.scss"

function Instagram() {
  const data = useStaticQuery(graphql`
    query {
      allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 48) {
        nodes {
          id
          username
          mediaType
          timestamp
          thumbnails {
            src
            config_width
            config_height
          }
        }
      }
    }
  `)

  console.log(data)
  return (
    <Layout section={"insta"}>
      <SEO title="Instagram" />
      <h1>@lizmakesphotos</h1>
      <div className={styles.gridContainer}>
        {data.allInstaNode.nodes.map(node => {
          console.log(node)
          return (
            // <Img
            //   imgStyle={{
            //     objectFit: "cover",
            //   }}
            //   fluid={node.localFile.childImageSharp.fluid}
            // />
            // <img src={node.preview} />

            <div>
              <a href={`https://www.instagram.com/p/${node.id}`}>
                <img
                  src={
                    node.thumbnails.filter(o => o.config_width === 480)[0].src
                  }
                />
              </a>
            </div>
          )
        })}
      </div>
      <div class={styles.bottomLink}>
        <a href="https://www.instagram.com/lizmakesphotos">
          See more @lizmakesphotos
        </a>
      </div>
    </Layout>
  )
}

export default Instagram
