module.exports = {
  siteMetadata: {
    title: `Liz Gorman Photography`,
    description: "Liz Gorman Photography portfolio page",
    author: `Liz Gorman`,
  },
  plugins: [
    'gatsby-plugin-webpack-bundle-analyzer',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `1780143228`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`, //works with variable fonts
      options: {
        fonts: [
          {
            family: "Jost",
            weights: ["300", "700"],
            // variable: true,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import "${__dirname}/src/styles/utils.scss";`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Liz Gorman Photography`,
    //     short_name: `LGP`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/favicon16.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
