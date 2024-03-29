import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./sectionIndex.module.scss"

const SectionIndex = ({ data, section }) => {
  const covers = data.allFile.edges.map(edge => edge.node)
  const title = section.charAt(0).toUpperCase() + section.slice(1) //capitalize section name
  return (
    <Layout section={section}>
      <SEO title={title} />
      <div className={styles.navGridContainer}>
        <div className={styles.navGrid}>
          {data.allMarkdownRemark.edges

            .filter(o => o.node.frontmatter.section == section) //eslint-disable-line
            .sort((a, b) => b.node.frontmatter.order - a.node.frontmatter.order)
            .map(({ node }, i) => {
              return (
                <Link key={i} to={"/" + node.frontmatter.slug}>
                  <Img
                    className={styles.gatsbyImage}
                    fluid={
                      covers.filter(
                        i => i.name == [node.frontmatter.cover.split(".")[0]] //eslint-disable-line
                      )[0].childImageSharp.fluid
                    }
                  />

                  <div className={styles.captionContainer}>
                    <h2>{node.frontmatter.title}</h2>
                  </div>
                </Link>
              )
            })}
        </div>
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
                  order
                }
              }
            }
          }
          allFile(filter: { relativeDirectory: { regex: "/cover/" } }) {
            edges {
              node {
                name
                childImageSharp {
                  fluid(maxWidth: 1200) {
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
