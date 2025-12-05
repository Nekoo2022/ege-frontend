import { VariantSlider } from "@/components/feature/variant/VariantSlider";

export default async function VariantSlugPage(props: { params: Promise<{ slug: string; variantId: string }> }) {
  const { slug, variantId } = await props.params;
  return <VariantSlider slug={slug} variantId={+variantId} />;
}
