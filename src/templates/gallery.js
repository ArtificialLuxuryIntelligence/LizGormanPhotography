import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import galleryStyles from "./gallery.module.scss"
import SlickAndThumbs from "../components/SlickAndThumbs"
import SEO from "../components/seo"

export default function Gallery({ data }) {
  const { markdownRemark, allFile } = data
  const { frontmatter, html, headings } = markdownRemark

  // separate images from separate subfolders in gallery
  function splitSubGalleries() {
    let subGalleries = []
    let currentPath = ""
    let currentSubGallery = -1
    allFile.edges.forEach(edge => {
      if (edge.node.relativeDirectory.split("/")[2] === currentPath) {
        subGalleries[currentSubGallery].push({
          fluid: edge.node.childImageSharp.fluid,
          // fixed: edge.node.childImageSharp.fixed,
          publicURL: edge.node.publicURL,
        })
      } else {
        currentPath = edge.node.relativeDirectory.split("/")[2]
        currentSubGallery++
        subGalleries.push([])
        subGalleries[currentSubGallery].push({
          fluid: edge.node.childImageSharp.fluid,
          // fixed: edge.node.childImageSharp.fixed,
          publicURL: edge.node.publicURL,
        })
      }
      // console.log(edge.node.relativeDirectory.split("/")[1])
    })
    return subGalleries
  }
  // returns array of descriptions (HTML) parsed from html generated from markdown
  function getDescriptions(html) {
    let descriptions = []
    if (headings.length == 0) {
      return [html]
    }
    let htmlSplit = html
    for (let i = 0; i < headings.length; i++) {
      htmlSplit = htmlSplit.split(`<h1>${headings[i].value}</h1>`)
      let d = htmlSplit.shift()
      htmlSplit = htmlSplit[0]
      descriptions.push(d.trim())
    }
    descriptions.push(htmlSplit.trim())
    descriptions.shift()
    return descriptions
  }

  const subGalleries = splitSubGalleries()
  const descriptions = getDescriptions(html)
  const docHeadings = headings.length == 0 ? [{ value: "" }] : headings

  return (
    <Layout section={frontmatter.section}>
      <SEO title={frontmatter.title} />
      <div className={`${galleryStyles.gallery}`}>
        <h1>{frontmatter.title}</h1>

        <div className={galleryStyles.carouselView}>
          {subGalleries.map((subGallery, i) => {
            return (
              <div
                key={i}
                className={` ${galleryStyles[docHeadings[i].value]}`}
              >
                <h2>{docHeadings[i].value}</h2>

                <div
                  className={galleryStyles.descriptionCarousel}
                  dangerouslySetInnerHTML={{ __html: descriptions[i] }}
                />

                <SlickAndThumbs>
                  {subGallery.map((src, j) => {
                    return (
                      <div key={(i, j)}>
                        <Img
                          className={galleryStyles.gatsbyImage}
                          imgStyle={{
                            objectFit: "contain",
                          }}
                          fluid={src.fluid}
                        />
                      </div>
                    )
                  })}
                </SlickAndThumbs>
              </div>
            )
          })}
        </div>
        <div className={galleryStyles.gridView}>
          {subGalleries.map((subGallery, i) => {
            return (
              <div
                key={i}
                className={` ${galleryStyles[docHeadings[i].value]}`}
              >
                <h2>{docHeadings[i].value}</h2>

                <div
                  className={galleryStyles.descriptionGrid}
                  dangerouslySetInnerHTML={{ __html: descriptions[i] }}
                />

                <div className="slick-container">
                  <div className={galleryStyles.galleryGrid}>
                    {/* <Slider {...settings}> */}
                    {subGallery.map((src, j) => {
                      return (
                        <div
                          key={(i, j)}
                          // onClick={() => {
                          //   setPhotoIndex([i, j])
                          //   setLightBoxOpen(true)
                          // }}
                          // style={{ height: "100%", width: "100%" }}
                        >
                          <Img
                            className={galleryStyles.gatsbyImage}
                            imgStyle={{
                              objectFit: "contain",
                            }}
                            fluid={src.fluid}
                          />
                        </div>
                      )
                    })}
                    {/* </Slider> */}
                  </div>
                </div>

                {/* {lightBoxOpen && (
                  <Lightbox
                    className={galleryStyles.lightbox}
                    mainSrc={
                      subGalleries[photoIndex[0]][photoIndex[1]].publicURL
                    }
                    nextSrc={
                      subGalleries[photoIndex[0]][
                        (photoIndex[1] + 1) % subGalleries[photoIndex[0]].length
                      ].publicURL
                    }
                    prevSrc={
                      subGalleries[photoIndex[0]][
                        (photoIndex[1] +
                          subGalleries[photoIndex[0]].length -
                          1) %
                          subGalleries[photoIndex[0]].length
                      ].publicURL
                    }
                    onMovePrevRequest={() =>
                      setPhotoIndex([
                        photoIndex[0],
                        (photoIndex[1] +
                          subGalleries[photoIndex[0]].length -
                          1) %
                          subGalleries[photoIndex[0]].length,
                      ])
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex([
                        photoIndex[0],
                        (photoIndex[1] + 1) %
                          subGalleries[photoIndex[0]].length,
                      ])
                    }
                    onCloseRequest={() => setLightBoxOpen(false)}
                    imagePadding={50}
                    enableZoom={false}
                    reactModalStyle={{
                      content: {},
                      overlay: {},
                    }}
                  />
                )} */}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($folderRegEx: String!, $slug: String!) {
    allFile(
      filter: { relativeDirectory: { regex: $folderRegEx } }
      sort: { fields: relativePath }
    ) {
      edges {
        node {
          id
          relativeDirectory
          publicURL
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        section
      }
      html
      headings {
        value
      }
    }
  }
`
