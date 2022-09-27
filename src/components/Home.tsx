import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from '@docusaurus/theme-common/internal';

interface HomeProps {
  readonly recentPosts: readonly { readonly content: Content }[];
}

const Home = ({ recentPosts }: HomeProps): JSX.Element => {
  return (
    <Layout>
      <div className="hero">
          <div className="container">
            <div className="hero-section">

                <h1 className="hero__title hero-color">
                  Hi There 🖖🏽! I'm Robin.
                </h1>
                <p className="hero__subtitle align-center">
                  I give unsolicited tech advice on the internet. <br />
                  I blog on software development topics that I felt needed more context when I was stuck on it too.
                </p>
            </div>
          </div>
      </div>
      <div className="container margin-top--xl">
        <div className="row">
          <div className="col col--9 col--offset-1">
              {recentPosts.map(({ content: BlogPostContent }) => (
                <BlogPostProvider
                  key={BlogPostContent.metadata.permalink}
                  content={BlogPostContent}
                >
                  <BlogPostItem>
                    <BlogPostContent />
                  </BlogPostItem>
                </BlogPostProvider>
              ))}
          </div> 
        </div>
      </div>
    </Layout>
  );
};

export default Home;

{/* <script src="https://giscus.app/client.js"
        data-repo="MisterMunchkin/blog-robin-dalmy"
        data-repo-id="R_kgDOH5NyHA"
        data-category="Announcements"
        data-category-id="DIC_kwDOH5NyHM4CRolK"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script> */}