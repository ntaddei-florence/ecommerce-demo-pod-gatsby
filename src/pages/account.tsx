import React, { FC } from "react";
import { PageProps } from "gatsby";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { MainLayout } from "../components/layouts/main-layout";
import { getCLToken } from "../components/commerce-layer/cl-token";

export interface AccountPageContext {
  slug: string;
}

export interface AccountPageProps
  extends PageProps<Queries.CategoriesPageQuery, AccountPageContext, {}, { clToken: string }> {}

export async function getServerData() {
  return {
    status: 200, // The HTTP status code that should be returned
    props: {
      clToken: (await getCLToken()).accessToken,
    }, // Will be passed to the page component as "serverData" prop
    headers: {}, // HTTP response headers for this page
  }
}

const AccountPage: FC<AccountPageProps> = ({ serverData: { clToken } }) => {
 const { user } = useAuth0();
  return (
    <MainLayout clToken={clToken}>
      <div className="p-8 flex flex-col gap-2">
        <pre>user: {JSON.stringify(user ?? null, null, 2)}</pre>
      </div>
    </MainLayout>
  );
};

export default withAuthenticationRequired(AccountPage);
