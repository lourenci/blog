import React from 'react'
import { Link, graphql } from 'gatsby'
import mapKeys from 'lodash/mapKeys'
import isEmpty from 'lodash/isEmpty'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import RelatedPosts from '../components/related-posts'

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share';

function shareButtonProps (href, title, utmSource) {
  return {
    url: `${href}?utm_source=${utmSource}&utm_medium=sharebuttons`,
    title: title,
    style: { cursor: 'pointer' }
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    const shareButtonForPost = shareButtonProps.bind(
      null,
      this.props.location.href,
      this.props.data.markdownRemark.frontmatter.title
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: rhythm(1) }}>
          <RedditShareButton {...shareButtonForPost('reddit')}>
            <RedditIcon size={44} round />
          </RedditShareButton>
          <TwitterShareButton {...shareButtonForPost('twitter')} hashtags={post.frontmatter.tags}>
            <TwitterIcon size={44} round />
          </TwitterShareButton>
          <FacebookShareButton
            {...mapKeys(shareButtonForPost('facebook'), (_, key) => key === 'title' ? 'quote' : key)}
            {...(!isEmpty(post.frontmatter.tags) && { hashtag: post.frontmatter.tags[0] })}
          >
            <FacebookIcon size={44} round />
          </FacebookShareButton>
        </div>
        <hr
          style={{
            marginTop: rhythm(1),
          }}
        />
        <RelatedPosts title={post.frontmatter.title} tags={post.frontmatter.tags} />

        <hr
          style={{
            marginTop: rhythm(2),
          }}
        />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
