import React, { FC, PropsWithChildren } from "react";
import { CommerceLayerProvider } from "../commerce-layer";
import { Navbar } from "../navbar";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CommerceLayerProvider>
      <Navbar />
      <main className="min-h-screen container mx-auto py-8">
        {children}
      </main>
    </CommerceLayerProvider>
  )
}