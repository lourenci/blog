import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import flow from "lodash/flow"
import partialRight from "lodash/partialRight"
import isEmpty from "lodash/isEmpty"

function sanitizePosts (posts) {
  return posts.allMarkdownRemark.nodes.map(post => ({
    title: post.frontmatter.title,
    slug: post.fields.slug,
    excerpt: post.excerpt,
    tags: post.frontmatter.tags
  }))
}

function removePostWithTitle (posts, title) {
  return posts.filter(({ title: postTitle }) => postTitle !== title)
}

function rankPostsByTags (posts, tags) {
  return posts.map(post => ({
    ...post,
    points: tags.reduce((points, tag) => post.tags.some(postTag => postTag === tag) ? points + 1 : points, 0)
  }))
}

function removeZeroPointPosts (posts) {
  return posts.filter(({ points }) => points > 0)
}

function sortPostsByPoints (posts) {
  console.log(posts)
  return [...posts].sort(({ points: first }, { points: second }) => second - first )
}

function RelatedPosts ({ title, tags }) {
  const data = useStaticQuery(graphql`
    query RelatedPostsQuery {
      allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            tags
            title
          }
          excerpt
        }
      }
    }
  `)

  const removeCurrentPost = partialRight(removePostWithTitle, title)
  const rankPosts = partialRight(rankPostsByTags, tags)
  const rankRelatedPosts = flow(sanitizePosts, removeCurrentPost, rankPosts, removeZeroPointPosts, sortPostsByPoints)

  const mostRankedPost = rankRelatedPosts(data)

  if (isEmpty(mostRankedPost)) return null

  return (
    <React.Fragment>
      <h3>You may also like...</h3>
      {mostRankedPost.slice(0, 3).map(({ title, slug, excerpt }) => (
        <div key={slug}>
          <h4><a href={slug}>{title}</a></h4>
          <span>{excerpt}</span>
        </div>
      ))}
    </React.Fragment>
  )
}

export default RelatedPosts
