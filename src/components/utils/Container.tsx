import React from "react";

export default function Container(props: { children: React.ReactNode }) {
  return <div className="container m-auto">{props.children}</div>;
}
