import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function ContactCard(props: {
  firstName: string;
  lastName: string;
  email: string;
  onUpdate?: () => void;
  onDelete?: () => void;
}) {
  const reduceStr = React.useCallback((value: string) => {
    return value.length > 45 ? value.slice(0, 45).concat(".....") : value;
  }, []);

  return (
    <div className="flex bg-white p-5 rounded-lg shadow-sm hover:shadow-lg space-x-2 w-[30rem] justify-between">
      <div className="flex flex-col">
        <span>
          <strong>Fist Name: </strong>
          {reduceStr(props.firstName)}
        </span>
        <span>
          <strong>Last Name: </strong>
          {reduceStr(props.lastName)}
        </span>
        <span>
          <strong>Email: </strong>
          {reduceStr(props.email)}
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <div
          onClick={props.onDelete}
          className="border-2 h-fit p-2 rounded-lg border-green-500 text-green-500 shadow-lg active:bg-green-50 transition-colors hover:cursor-pointer"
        >
          <MdDelete size={20} />
        </div>
        <div
          onClick={props.onUpdate}
          className="border-2 h-fit p-2 rounded-lg border-green-500 text-green-500 shadow-lg active:bg-green-50 transition-colors hover:cursor-pointer"
        >
          <FaEdit size={20} />
        </div>
      </div>
    </div>
  );
}
