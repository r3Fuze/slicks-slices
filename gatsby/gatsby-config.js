import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export default {
  siteMetadata: {
    title: "Slick's Slices",
    siteUrl: "https://fuz.space",
    description: "The best pizza place in Hamilton!",
    twitter: "@slicksslices",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "b2vhxjgj",
        dataset: "production",
        watchMode: process.env.NODE_ENV === "development",
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
