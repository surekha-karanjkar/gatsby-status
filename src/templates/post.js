import React, { Component } from "react"
import { graphql } from "gatsby"

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost
    let title = ""
    let subtitle = ""

    if (post.acf !== null) {
      if (post.acf.title !== "") {
        title = `${post.acf.title}`
      }

      if (post.acf.subtitle !== "") {
        subtitle = ` ${post.acf.subtitle}`
      }
    }
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: subtitle }} />

        <img
          src={post.acf.newpageimage.localFile.childImageSharp.fluid.srcWebp}
        />
      </div>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      acf {
        subtitle
        title
        newpageimage {
          localFile {
            childImageSharp {
              fluid(maxWidth: 500) {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
