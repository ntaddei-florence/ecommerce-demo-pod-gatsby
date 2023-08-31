import { authentication } from "@commercelayer/js-auth";

const clientId = process.env.COMMERCELAYER_CLIENT_ID!;
const slug = process.env.COMMERCELAYER_SLUG!;
const scope = process.env.COMMERCELAYER_SCOPE!;

const options = {
  clientId,
  slug,
  scope,
};

export const getCLToken = async () => {
  return await authentication("client_credentials", options);
}
