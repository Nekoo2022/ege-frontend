import { TaskContent } from "@/components/feature/task/TaskContent";

interface FindQuestionByTaskNumberProps {
  slug: string;
  taskNumber: string;
}

export default async function FindQuestionByTaskNumberPage(props: {
  params: Promise<FindQuestionByTaskNumberProps>;
}) {
  const { taskNumber, slug } = await props.params;

  return <TaskContent tasks={{ taskNumber, slug }} />;
}
