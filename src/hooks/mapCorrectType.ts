import { IsCorrectType } from "@/graphql/generated/output";

export function mapCorrectType(type: IsCorrectType): "full" | "partial" | "wrong" | "no-correct" {
  switch (type) {
    case IsCorrectType.Full:
      return "full";
    case IsCorrectType.Partial:
      return "partial";
    case IsCorrectType.Nocorrect:
      return "no-correct";
    default:
      return "wrong";
  }
}
