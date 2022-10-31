import React, { useMemo } from "react";

export default function TextInput(props: {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  name?: string;
  autoComplete?: string;
  hint?: string;
  hintColor?: "green" | "red";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}) {
  const id = useMemo(() => {
    const random = Math.random().toString(36).substring(7);
    return `${props.type}-${random}`;
  }, [props.type]);

  const getHintColorClass = useMemo(() => {
    if (props.hintColor) {
      return props.hintColor === "green" ? "text-green-600" : "text-red-600";
    }
    return "text-green-600";
  }, [props.hintColor]);

  return (
    <div>
      <label
        htmlFor={id}
        className="form-label inline-block mb-1 text-gray-800 font-bold hover:cursor-pointer"
      >
        {props.label}
      </label>
      <div className="flex flex-nowrap items-baseline">
        <input
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id={id}
          placeholder={props.placeholder}
          type={props.type}
          autoComplete={props.autoComplete}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          maxLength={props.maxLength}
        />
      </div>
      {props.hint && (
        <div className={`${getHintColorClass} text-sm mt-1`}>{props.hint}</div>
      )}
    </div>
  );
}
