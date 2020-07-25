import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/art/">ART</Link> <br />
    <Link to="/commercial/">COMMERCIAL</Link>
  </Layout>
)

export default IndexPage
