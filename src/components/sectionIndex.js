import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./sectionIndex.module.scss"

const SectionIndex = ({ data, section }) => {
  // console.log("DATA", data)
  // console.log("SECTION", section)
  const covers = data.allFile.edges.map(edge => edge.node)
  // console.log("covers", covers)
  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.navGrid}>
        {data.allMarkdownRemark.edges
          .filter(o => o.node.frontmatter.section == section)
          .map(({ node }) => {
            // console.log(node.frontmatter)
            return (
              <Link to={"/" + node.frontmatter.slug}>
                <Img
                  imgStyle={{
                    // objectFit: "contain",
                    // objectPosition: "left",
                  }}
                  className={styles.gatsbyImage}
                  fluid={
                    covers.filter(
                      i => i.name == [node.frontmatter.cover.split(".")[0]]
                    )[0].childImageSharp.fluid
                  }
                />
                <h2>{node.frontmatter.title}</h2>
              </Link>
            )
          })}
      </div>
    </Layout>
  )
}

export default function MySectionIndex(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            totalCount
            edges {
              node {
                id
                excerpt
                frontmatter {
                  slug
                  cover
                  section
                  title
                }
              }
            }
          }
          allFile(filter: { relativeDirectory: { regex: "/cover/" } }) {
            edges {
              node {
                name
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => <SectionIndex data={data} {...props} />}
    />
  )
}
