import React, { FC } from "react"
import { HeadFC, PageProps, Link } from "gatsby"
import { MainLayout } from "../components/layouts/main-layout";
import { getCLToken } from "../components/commerce-layer/cl-token";

export interface IndexPageContext {
  slug: string;
}

export interface IndexPageProps
  extends PageProps<Queries.CategoriesPageQuery, IndexPageContext, {}, { clToken: string }> {}

export async function getServerData() {
  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      clToken: (await getCLToken()).accessToken,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  }
}

const IndexPage: FC<IndexPageProps> = ({ serverData: { clToken } }) => {
  return (
    <MainLayout clToken={clToken}>
      <div className="p-8 flex flex-col gap-2">
        <p><Link className="link" to="/account">Visit Your Account</Link></p>
        <p><Link className="link" to="/categories">Go to categories</Link></p>
      </div>
    </MainLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
