import IncorrectTaskContent from "@/components/feature/task/IncorrectTaskContent";

interface IncorrectPageProps {
  slug: string;
}

export default async function IncorrectPage(props: { params: Promise<IncorrectPageProps> }) {
  const { slug } = await props.params;
  return <IncorrectTaskContent slug={slug} />;
}
