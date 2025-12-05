import { SubjectBySlugClient } from "@/components/feature/subjects/SubjectBySlugClient";

export default async function SubjectBySlugPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <SubjectBySlugClient slug={slug} />;
}
