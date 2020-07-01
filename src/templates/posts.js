import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"

class PostsTemplate extends Component {
  render() {
    const data = this.props.data
    console.log(data)
    return (
      <div>
        <h1>Posts</h1>

        {data.allWordpressPost.edges.map(({ node }) => (
          <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>
            <Link to={"post/" + node.slug}>
              <h3>{node.acf.title}</h3>
            </Link>

            <div dangerouslySetInnerHTML={{ __html: node.acf.subtitle }} />

            {node.date}
          </div>
        ))}
      </div>
    )
  }
}

PostsTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostsTemplate

export const pageQuery = graphql`
  query postsQuery {
    allWordpressPost {
      edges {
        node {
          id
          title
          excerpt
          slug
          link
          path
          date(formatString: "MMMM DD, YYYY")
          acf {
            title
            subtitle
            newpageimage {
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
