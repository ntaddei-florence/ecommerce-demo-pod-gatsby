import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components";
import React, { FC, PropsWithChildren } from "react";

import { CL_PERSIST_KEY } from "./constants";

const endpoint = process.env.COMMERCELAYER_ENDPOINT!;

export interface CommerceLayerProviderProps {
  accessToken: string;
}

export const CommerceLayerProvider: FC<
  PropsWithChildren<CommerceLayerProviderProps>
> = ({ children, accessToken }) => {
  if (!accessToken) return children;

  return (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      <OrderStorage persistKey={CL_PERSIST_KEY}>
        <OrderContainer
          attributes={{
            cart_url: "/cart",
            return_url: "/return",
            privacy_url: "/privacy",
          }}
        >
          {/* CommerceLayer wants a "DefaultChildrenType" that I'm not able to import */}
          {children as any}
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};
