import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function Header(props: {
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  subtitle: string | number | boolean | null | undefined;
}) {
  return (
    <div className="ml-20 mt-20">
      <h1 className="text-[24px]  mb">{props.title}</h1>
      <p className="text-xs mb-2 text-gray-500">{props.subtitle}</p>
      <div className="w-full h-[1px]  mb-20 bg-blue-600" />
    </div>
  );
}
