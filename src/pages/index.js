import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
export default function Home({ data }) {
  return (
    <Layout>
      <SEO title="home" />
      <h1>My WordPress Blog</h1>
      <h4>Posts</h4>
      {data.allWordpressAcfTeams.edges.map(({ node }) => (
        <div>
          <p>{}</p>

          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <div style={{ color: "green" }}>
            {node.acf.team_title}
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />

            {node.acf.team_subtitile}
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />

            <img
              src={node.acf.team_image.localFile.childImageSharp.sizes.srcWebp}
            />
          </div>
        </div>
      ))}
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    allWordpressAcfTeams {
      edges {
        node {
          acf {
            team_subtitile
            team_title
            team_image {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 500) {
                    base64
                    tracedSVG
                    srcWebp
                    srcSetWebp
                    originalImg
                    originalName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
