import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from "@docusaurus/theme-common/internal";
import Head from "@docusaurus/Head";
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';

export default function FooterWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, isBlogPostPage } = useBlogPost();
  const { colorMode } = useColorMode();

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
          repo={`${siteConfig.organizationName}/${siteConfig.projectName}`}
          repoId={siteConfig.customFields.repoId}
          category={siteConfig.customFields.category}
          categoryId={siteConfig.customFields.categoryId}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode}
          lang="en"
          loading="lazy" 
        /> 
      </div>
    </>
  );
}
