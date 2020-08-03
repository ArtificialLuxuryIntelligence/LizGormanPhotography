import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.scss"

const About = () => (
  <Layout>
    <SEO title="About" />

    <div className={styles.fonts}>
      <p style={{ fontWeight: 100 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 200 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 300 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 400 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 500 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 600 }}> font weight test FONT WEIGHT TEST</p>
      <p style={{ fontWeight: 700 }}> font weight test FONT WEIGHT TEST</p>
    </div>
    <div className={styles.weights}>
      <p>weights</p>
    </div>
  </Layout>
)
export default About
