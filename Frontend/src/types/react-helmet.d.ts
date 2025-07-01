// types/react-helmet.d.ts
declare module "react-helmet" {
  import * as React from "react";

  export interface HelmetProps {
    title?: string;
    titleTemplate?: string;
    defaultTitle?: string;
    base?: any;
    meta?: any[];
    link?: any[];
    script?: any[];
    style?: any[];
    noscript?: any[];
    htmlAttributes?: any;
    bodyAttributes?: any;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
  }

  export class Helmet extends React.Component<HelmetProps> {}
}
