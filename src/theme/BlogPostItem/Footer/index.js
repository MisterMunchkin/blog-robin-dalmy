import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from "@docusaurus/theme-common/internal";
import Head from "@docusaurus/Head";
import Giscus from '@giscus/react';

export default function FooterWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();

  if (!isBlogPostPage) {
    return <Footer {...props} />
  }

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <Footer {...props} />
      <div className='margin-vert--xl'>
        <Giscus 
          id='comments'
          repo="MisterMunchkin/blog-robin-dalmy"
          repoId="R_kgDOH5NyHA"
          category="Announcements"
          categoryId="DIC_kwDOH5NyHM4CRolK"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy" 
        /> 
      </div>
    </>
  );
}
