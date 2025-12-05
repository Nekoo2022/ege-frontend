export function ClearTaskInputs(slug: string, taskIds: string[]) {
  taskIds.forEach((id) => {
    try {
      localStorage.removeItem(`input:${slug}:${id}`);
    } catch (error) {
      console.warn("Не удалось очистить LocalStorage для задания", id, error);
    }
  });
}
