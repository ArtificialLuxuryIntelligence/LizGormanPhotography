import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

// import Lightbox from "react-image-lightbox"
// import "react-image-lightbox/style.css"
import Img from "gatsby-image"
import galleryStyles from "./gallery.module.scss"
// import "./slickStyles.scss"
import SlickAndThumbs from "../components/SlickAndThumbs"

export default function Gallery({ data }) {
  // const [lightBoxOpen, setLightBoxOpen] = useState(false)
  // const [photoIndex, setPhotoIndex] = useState([0, 1])
  const { markdownRemark, allFile } = data
  const { frontmatter, html } = markdownRemark

  //function separate images from separate subfolders in gallery
  function splitSubGalleries() {
    console.log("subtitles", frontmatter.subtitles)
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
  const subGalleries = splitSubGalleries()
  console.log(subGalleries)

  return (
    <Layout section={frontmatter.section}>
      {/* seo page here */}
      <div className={`${galleryStyles.gallery}`}>
        <h1>{frontmatter.title}</h1>

        <div className={galleryStyles.carouselView}>
          {subGalleries.map((subGallery, i) => {
            return (
              <div
                key={i}
                className={` ${galleryStyles[frontmatter.subtitles[i]]}`}
              >
                <h2>{frontmatter.subtitles[i]}</h2>

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
                className={` ${galleryStyles[frontmatter.subtitles[i]]}`}
              >
                <h2>{frontmatter.subtitles[i]}</h2>

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
        subtitles
        section
      }
      html
    }
  }
`
