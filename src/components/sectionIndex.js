import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SectionIndex = ({ data, section }) => {
  // console.log("DATA", data)
  // console.log("SECTION", section)
  const covers = data.allFile.edges.map(edge => edge.node)
  // console.log("covers", covers)
  return (
    <Layout>
      <SEO title="Home" />
      <h2>Welcome to a section page</h2>

      {data.allMarkdownRemark.edges
        .filter(o => o.node.frontmatter.section == section)
        .map(({ node }) => {
          // console.log(node.frontmatter)
          return (
            <div style={{ maxWidth: 300 }}>
              <Link to={"/" + node.frontmatter.slug}>
                {node.frontmatter.slug}
                <Img
                  // imgStyle={{
                  //   objectFit: "cover",
                  // }}
                  fluid={
                    covers.filter(
                      i => i.name == [node.frontmatter.cover.split(".")[0]]
                    )[0].childImageSharp.fluid
                  }
                />
              </Link>
            </div>
          )
        })}
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
