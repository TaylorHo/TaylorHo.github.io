import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';
import { IconBookmark } from '@components/icons';

const StyledMainContainer = styled.main`
  padding: 0 0 !important;

  & > header {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: clamp(24px, 5vw, var(--fz-heading));
    }

    .archive-link {
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      &:after {
        bottom: 0.1em;
      }
    }
  }

  footer {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-top: 20px;
  }
`;
const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
  margin-top: 50px;
  position: relative;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;
const StyledPost = styled.li`
  transition: var(--transition);
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .post__inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .post__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    background-color: var(--light-navy);

    header,
    a {
      width: 100%;
    }
  }

  .post__icon {
    ${({ theme }) => theme.mixins.flexBetween};
    color: var(--green);
    margin-bottom: 30px;
    margin-left: -5px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .post__title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .post__desc {
    color: var(--light-slate);
    font-size: 17px;
  }

  .post__date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }

  ul.post__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Posts = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              slug
              date
              tags
              draft
            }
            html
          }
        }
      }
    }
  `);
  const posts = data.posts.edges;

  return (
    <StyledMainContainer>
      <header>
        <h2>Posts</h2>
        <Link className="inline-link archive-link" to="/posts">
          ver todos os posts
        </Link>
      </header>

      <StyledGrid>
        {posts.length > 0 &&
          posts.map(({ node }, i) => {
            const { frontmatter } = node;
            const { title, description, slug, date, tags } = frontmatter;
            const formattedDate = new Date(date).toLocaleDateString();

            return (
              <StyledPost key={i}>
                <div className="post__inner">
                  <header>
                    <div className="post__icon">
                      <IconBookmark />
                    </div>
                    <h5 className="post__title">
                      <Link to={slug}>{title}</Link>
                    </h5>
                    <p className="post__desc">{description}</p>
                  </header>

                  <footer>
                    <span className="post__date">{formattedDate}</span>
                    <ul className="post__tags">
                      {tags.map((tag, i) => (
                        <li key={i}>
                          <Link to={`/posts/tags/${kebabCase(tag)}/`} className="inline-link">
                            #{tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </footer>
                </div>
              </StyledPost>
            );
          })}
      </StyledGrid>
    </StyledMainContainer>
  );
};

export default Posts;
