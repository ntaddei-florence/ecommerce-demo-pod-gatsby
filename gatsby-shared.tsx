import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./src/api/apollo-client";  

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/', { replace: true });
};

export const wrapPageElement = (props) => {
  return (
    props?.pageResources?.page?.path?.match("dev-404-page") ? (
    props.element
  ) : (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN!}
      clientId={process.env.AUTH0_CLIENTID!}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider client={apolloClient}>
        {props.element}
      </ApolloProvider>
    </Auth0Provider>
  )
);
};