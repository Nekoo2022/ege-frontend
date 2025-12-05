import { TaskStatisticContent } from "@/components/feature/statistic/TaskStatisticContent";

export default async function TaskStatisticPage(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug;
  return (
    <div className="mt-3">
      <TaskStatisticContent slug={slug} />
    </div>
  );
}
