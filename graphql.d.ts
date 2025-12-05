declare module "*.graphql" {
  import type { DocuemntNode } from "graphql";

  const schema: DocuemntNode;

  export = schema;
}
