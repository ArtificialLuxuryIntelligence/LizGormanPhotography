import React from "react"
import { navigate } from "gatsby-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.scss"

import { graphql } from "gatsby"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const About = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }
  //
  return (
    <Layout section={frontmatter.about}>
      <SEO title="About" />
      <div className={styles.textContainer}>
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className={styles.formContainer}>
        <h2>Contact</h2>
        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your name:
              <br />
              <input type="text" name="name" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your email:
              <br />
              <input type="email" name="email" onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message:
              <br />
              <textarea name="message" onChange={handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </div>
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
