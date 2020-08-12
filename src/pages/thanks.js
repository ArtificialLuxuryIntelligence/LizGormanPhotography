import React from "react"
import styles from "./thanks.module.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Thanks = () => (
  <Layout section="insta">
    {/* section 'insta' renders a 'neutral' nav - i.e. neither in art/commercial part of site */}
    <SEO title="Thanks" />
    <div className={styles.textContainer}>
      <h1>Message sent!</h1>
      <div>
        <p>Thanks for your message. I'll be in touch soon.</p>
      </div>
    </div>
  </Layout>
)

export default Thanks
