export function getVariantPath(
  product: { slug: string | null },
  variant?: null | { slug?: string | null; sku: string | null }
) {
  return variant?.slug
    ? `/products/${variant.slug}`
    : `/products/${product.slug}/${variant?.sku}`;
}
