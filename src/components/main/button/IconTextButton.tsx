import React from "react";

export default function IconTextButton(props: {
  title: string;
  onClick?: () => void;
  IconNode: React.ReactNode;
  color?: "success" | "primary" | "light";
}) {
  const ButtonTypes = React.useMemo(
    () => ({
      success:
        "px-6 py-2.5 bg-green-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-lg transition duration-150 ease-in-out",
      primary:
        "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",
      light:
        "px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out",
    }),
    []
  );

  const getType = React.useMemo(() => {
    if (props.color) {
      return ButtonTypes[props.color];
    }
    return ButtonTypes.primary;
  }, [props.color, ButtonTypes]);

  return (
    <div>
      <button
        type="button"
        className={getType.concat(
          " flex align-center justify-center space-x-2"
        )}
        onClick={props.onClick}
      >
        {props.IconNode}
        <span>{props.title}</span>
      </button>
    </div>
  );
}
