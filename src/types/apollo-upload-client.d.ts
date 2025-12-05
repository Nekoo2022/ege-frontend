declare module "apollo-upload-client" {
  import { ApolloLink } from "@apollo/client/core";
  import { HttpOptions } from "@apollo/client/link/http";

  export interface UploadLinkOptions extends HttpOptions {}

  export function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}
