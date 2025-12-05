import { FindIncorrectQuestionsByTaskNumberClient } from "@/components/feature/FindIncorrectQuestionsByTaskNumberClient";

interface IncorrectPageProps {
  slug: string;
  taskNumber: string;
}

export default async function FindIncorrectQuestionsByTaskNumber(props: { params: Promise<IncorrectPageProps> }) {
  const { slug, taskNumber } = await props.params;
  return <FindIncorrectQuestionsByTaskNumberClient slug={slug} taskNumber={+taskNumber} />;
}
