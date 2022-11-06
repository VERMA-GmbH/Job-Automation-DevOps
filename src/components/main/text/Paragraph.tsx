import React from "react";

export default function Paragraph(props: { children: string }) {
  return <p className="italic">{props.children}</p>;
}
