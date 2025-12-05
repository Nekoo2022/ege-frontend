import CreateAccountForm from "@/components/feature/auth/forms/CreateAccountForm";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Создание аккаунта",
  };
}

export default function CreateAccountPage() {
  return <CreateAccountForm />;
}
