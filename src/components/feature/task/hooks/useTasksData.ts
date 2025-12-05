// import { useFindRandomTasksQuery, useFindTaskCountQuery } from "@/graphql/generated/output";
// import { useMemo } from "react";

// interface UseTasksDataOptions {
//   slug: string;
//   taskNumber: string;
//   skip: number;
//   take: number;
// }

// export function useTasksData({ slug, taskNumber, skip, take }: UseTasksDataOptions) {
//   const {
//     data: countData,
//     loading: countLoading,
//     error: countError,
//   } = useFindTaskCountQuery({
//     variables: { data: { slug, taskNumber: +taskNumber } },
//   });
//   const totalTasks = countData?.FindTaskCount || 0;

//   const {
//     data: listData,
//     loading: listLoading,
//     error: listError,
//     refetch,
//     client,
//   } = useFindRandomTasksQuery({
//     variables: { data: { slug, taskNumber: +taskNumber, skip, take } },
//   });

//   // Мемоизация списка задач — если данные не изменились, React не будет пересоздавать массив
//   const taskList = useMemo(() => listData?.FindRandomTasks ?? [], [listData]);
//   console.log(taskList.length);
//   const loading = countLoading || listLoading;
//   const error = countError || listError;

//   return { taskList, totalTasks, loading, error, refetch, client };
// }
