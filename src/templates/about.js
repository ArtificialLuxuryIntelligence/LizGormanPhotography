// import React from "react"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import styles from "./about.module.scss"

// const About = ({ children, section }) => (
//   <Layout section={section}>
//     <SEO title="About" />
//     <div>{children}</div>
//   </Layout>
// )
// export default About

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.scss"

import { graphql } from "gatsby"

const About = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout section={frontmatter.about}>
      <SEO title="About" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
export default About

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        about
        slug
      }
    }
  }
`
