import React, { FunctionComponent } from 'react';
import {Helmet} from "react-helmet";

interface PageTitleProps {
  title: string
  hideSiteName?: boolean
}

const PageTitle: React.FC<PageTitleProps> = ({title, hideSiteName = false, ...rest}) => {
  return <>
    <Helmet>
      { hideSiteName ? 
        <title>{`${title ? `${title}` : `` }`}</title> :
        <title>{`${title ? `${title} - ` : `` }CUDGS CS:GO Leaderboard`}</title>
      }
    </Helmet>
  </>
}

export default PageTitle;