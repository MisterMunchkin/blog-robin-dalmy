import React from "react";
import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from '@docusaurus/theme-common/internal';
import Waves from "./Waves";

interface HomeProps {
  readonly recentPosts: readonly { readonly content: Content }[];
}

const Home = ({ recentPosts }: HomeProps): JSX.Element => {
  return (
    <Layout>
      <div className="hero hero-image">
        <div className="container">
          <div className="hero-section">
            <div className="hero-text">
              <h1 className="hero__title">
              Hi there 🖖🏽! I'm <span className="gradient-anim-right">Robin Dalmy</span> 
              </h1>
              <p className="hero__subtitle">
                I give unsolicited tech advice on the internet. <br />
                I blog on software development topics that I felt needed more context <br /> when I was stuck on it too.
              </p>
            </div>

            <img title="profile picture" className="hero-picture" src="https://github.com/mistermunchkin.png" />
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