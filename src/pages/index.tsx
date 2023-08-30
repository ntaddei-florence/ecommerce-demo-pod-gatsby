import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Cart } from "../components/commerce-layer"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      <Cart />
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
