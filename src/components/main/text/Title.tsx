import React from "react";

export default function Title(props: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <span className="flex space-x-2 mt-5">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
        {props.title}
      </h1>
      {props.children}
    </span>
  );
}
