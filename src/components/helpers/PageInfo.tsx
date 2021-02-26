import React, { FunctionComponent } from 'react';
import {Helmet} from "react-helmet";

interface PageTitleProps {
  title: string
  titleHideSiteName?: boolean,
  metaDescription?: string,
  metaTitle?: string,
  metaSiteName?: string
}

const PageTitle: React.FC<PageTitleProps> = ({title, titleHideSiteName = false, metaDescription, metaTitle, metaSiteName, ...rest}) => {
  return <>
    <Helmet>
      { titleHideSiteName ? 
        <title>{`${title ? `${title}` : `` }`}</title> :
        <title>{`${title ? `${title} - ` : `` }CUDGS CS:GO Leaderboard`}</title>
      }
      {/* {
        metaTitle ? <>
          <meta content={metaTitle} property="og:title" />
        </> : null
      }
      {
        metaDescription ? <>
          <meta content={metaDescription} property="og:description" />
        </> : null
      }
      {
        metaSiteName ? <>
          <meta content={metaSiteName} property="og:site_name" />
        </> : null
      } */}
    </Helmet>
  </>
}

export default PageTitle;