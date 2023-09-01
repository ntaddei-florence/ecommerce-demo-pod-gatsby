import CommerceLayer from "@commercelayer/sdk";
import { useMemo } from "react";

export const useCommerceLayer = (accessToken: string) => {
  const commerceLayer = useMemo(
    () =>
      CommerceLayer({
        organization: process.env.GATSBY_COMMERCELAYER_SLUG!,
        accessToken,
      }),
    [accessToken]
  );

  return commerceLayer;
};
