const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // const slug = createFilePath({ node, getNode, basePath: `pages` })
    // createNodeField({
    //   node,
    //   name: `slug`,
    //   value: slug,
    // })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              folder
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (
      node.frontmatter.slug !== "art-about" &&
      node.frontmatter.slug !== "commercial-about"
    ) {
      console.log("NOOOOOOOOOOOOOOOOODE", node.frontmatter.slug)

      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(`./src/templates/gallery.js`),
        context: {
          slug: node.frontmatter.slug,
          folderRegEx: `/${node.frontmatter.folder}/`,
        },
      })
    } else {
      console.log("CHOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOODE", node)

      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(`./src/templates/about.js`),
        context: {
          slug: node.frontmatter.slug,
        },
      })
    }
  })
}
