import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout section="insta">
    {/* section 'insta' renders a 'neutral' nav - i.e. neither in art/commercial part of site */}
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>Nothing to see here.</p>
  </Layout>
)

export default NotFoundPage
