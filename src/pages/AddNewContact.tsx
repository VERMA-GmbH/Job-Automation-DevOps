import React from "react";
import { FormRender } from "../components/main/forms";
import { Container } from "../components/utils";
import curd from "../database/curd";
import useForms from "../hooks/useForms";
import useContactSchema from "../input-schema/useContactSchema";

export default function AddNewContact() {
  const schema = useContactSchema();

  const formProps = useForms({
    fields: schema,
  });

  const onSave = async () => {
    if (formProps.onValidate()) {
      curd.setData(formProps.data);
      return true;
    }
    return false;
  };

  return (
    <div>
      <Container>
        <p className="text-2xl font-bold my-3 text-center">Add New Contact</p>
        <div className="flex justify-center">
          <div className="w-full md:w-[30] lg:w-[30rem]">
            <FormRender {...formProps} fields={schema} onSave={onSave} />
          </div>
        </div>
      </Container>
    </div>
  );
}
