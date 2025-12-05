"use client";

import { createContext, useContext } from "react";
import { SubjectVariantContextType } from "../types/context";

export const SubjectVariantContext = createContext<SubjectVariantContextType | null>(null);

export function useSubjectVariantContext() {
  const context = useContext(SubjectVariantContext);
  if (!context) throw new Error("useSubjectVariantContext must be used inside <SubjectVariantProvider>");
  return context;
}
