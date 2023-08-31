import React, { FC, PropsWithChildren } from "react";
import { CommerceLayerProvider } from "../commerce-layer";
import { Navbar } from "../navbar";

export interface MainLayoutProps {
  clToken: string;
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({ children, clToken }) => {
  return (
      <CommerceLayerProvider accessToken={clToken}>
        <Navbar />
        <main className="min-h-screen container mx-auto py-8">
          {children}
        </main>
      </CommerceLayerProvider>
  )
}