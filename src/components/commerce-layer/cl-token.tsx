import { authentication } from "@commercelayer/js-auth";

const clientId = process.env.GATSBY_COMMERCELAYER_CLIENT_ID!;
const slug = process.env.GATSBY_COMMERCELAYER_SLUG!;
const scope = process.env.GATSBY_COMMERCELAYER_SCOPE!;

const options = {
  clientId,
  slug,
  scope,
};

export const getCLToken = async () => {
  return await authentication("client_credentials", options);
};
