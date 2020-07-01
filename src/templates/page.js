import React, { Component } from "react"
import { graphql } from "gatsby"

class PageTemplate extends Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const currentPage = this.props.data.wordpressPage

    console.log(currentPage)

    let title = ""
    let subtitle = ""
    let image = ""
    if (currentPage.acf !== null) {
      if (currentPage.acf.title !== null) {
        title = `${currentPage.acf.title}`
      }
      if (currentPage.acf.subtitle !== null) {
        subtitle = `${currentPage.acf.subtitle}`
      }
      if (currentPage.acf.newpageimage !== null) {
        image = `${currentPage.acf.newpageimage.localFile.childImageSharp.fluid.srcWebp}`
      }
    }
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <div dangerouslySetInnerHTML={{ __html: subtitle }} />
        <img src={image} />
        <p dangerouslySetInnerHTML={{ __html: currentPage.date }} />
        <p dangerouslySetInnerHTML={{ __html: siteMetadata.description }} />
      </div>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      slug
      id
      date(formatString: "MMMM DD, YYYY")
      acf {
        title
        subtitle
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
      id
      siteMetadata {
        title
        description
      }
    }
  }
`
