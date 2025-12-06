import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

// ⚠️ Отключаем проверку SSL (только для dev/staging)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL,
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated/output.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
  ignoreNoDocuments: true,
  config: {
    withSuspense: false,
  },
};

export default config;
