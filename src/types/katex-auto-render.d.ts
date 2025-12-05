declare module "katex/contrib/auto-render" {
  import type { Options } from "katex";

  const renderMathInElement: (
    element: HTMLElement,
    options?: Partial<Options> & {
      delimiters?: { left: string; right: string; display?: boolean }[];
    }
  ) => void;

  export default renderMathInElement;
}
