import { FetchedData, FetchedDataSelections } from "../SubjectVariant";

export interface SubjectVariantContextType {
  slug: string;
  fetchedData: FetchedData[];
  flag: boolean;
  setFlag: (value: boolean) => void;
}
