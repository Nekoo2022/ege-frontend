"use client";

import { Button } from "@/components/ui/common/Button";
import { SubjectVariantContext } from "./context/SubjectVariantContext";
import SubjectBySlugList from "./SubjectBySlugList";
import { useCreateUserVariantMutation } from "@/graphql/generated/output";
import { FetchedData } from "./SubjectVariant";
import { useState } from "react";
import { toast } from "sonner";

export function SubjectBySlugClient({ slug }: { slug: string }) {
  const [fetchedData, setFetchedData] = useState<FetchedData[]>([]);
  const [createVariant] = useCreateUserVariantMutation();
  console.log(fetchedData);
  const [flag, setFlag] = useState(true);
  let variantId;

  async function handleOnClick() {
    if (fetchedData.length === 0) {
      toast.error("Добавьте хотя бы одно задание в вариант");
      return;
    }

    try {
      const { data } = await createVariant({ variables: { data: { selections: fetchedData } } });

      variantId = data?.CreateUserVariant;

      if (variantId) {
        toast.success("Вариант успешно создан");

        window.location.href = `/variant/${slug}/${variantId}`;
      }
    } catch (error) {
      toast.error("Ошибка при создании аккаунта");

      console.log(error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-5 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#5e52cb]">Задания по русскому языку</h1>
        <div className="flex items-center gap-2">
          {!flag && (
            <Button variant={"dark"} onClick={handleOnClick}>
              Создать вариант
            </Button>
          )}
          {flag ? (
            <Button variant={"outline"} onClick={() => setFlag(!flag)}>
              Добавить вариант
            </Button>
          ) : (
            <Button variant={"outline"} onClick={() => setFlag(!flag)}>
              Отменить
            </Button>
          )}
        </div>
      </div>
      <SubjectVariantContext.Provider value={{ fetchedData, slug, flag, setFlag }}>
        <SubjectBySlugList />
      </SubjectVariantContext.Provider>
    </div>
  );
}
