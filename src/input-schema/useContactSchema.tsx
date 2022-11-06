import React from "react";

export default function useContactSchema() {
  const schema = React.useMemo(
    () => [
      {
        type: "text",
        label: "First Name",
        name: "first_name",
        placeholder: "First name",
        validate: true,
        hintText: "First name is compulsory",
        defaultValue: "",
      },
      {
        type: "text",
        label: "Last Name",
        name: "last_name",
        placeholder: "Last name",
        validate: true,
        hintText: "Last name is compulsory",
        defaultValue: "",
      },
      {
        type: "email",
        label: "Email",
        name: "email",
        placeholder: "Email address",
        validate: true,
        hintText: "Email id is compulsory",
        defaultValue: "",
        validation: (value: string) => {
          const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (!regex.test(value)) {
            return {
              error: true,
              hintText: "Please enter a valid email address.",
            };
          }
          return { error: false };
        },
      },
    ],
    []
  );
  return schema;
}
