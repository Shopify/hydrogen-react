export function Product() {
  const data: any = {};

  return (
    <ProductProvider data={data.product} initialVariantId="some-id">{/* Your JSX */}</ProductProvider>
  );
}
