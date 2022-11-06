import React from "react";
import { useParams } from "react-router-dom";
import { FormRender } from "../components/main/forms";
import { Container } from "../components/utils";
import curd from "../database/curd";
import useForms from "../hooks/useForms";
import useContactSchema from "../input-schema/useContactSchema";

export default function EditContact() {
  const schema = useContactSchema();
  const { id } = useParams();

  const formProps = useForms({
    fields: schema,
  });

  const onRetrieve = () => {
    const data = curd.getItem(id);
    formProps.setData(data);
  };

  const onUpdate = async () => {
    if (formProps.onValidate()) {
      curd.updateItem(id, formProps.data);
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    onRetrieve();
  }, []);

  return (
    <div>
      <Container>
        <p className="text-2xl font-bold my-3 text-center">Edit Old Contact</p>
        <div className="flex justify-center">
          <div className="w-full md:w-[30] lg:w-[30rem]">
            <FormRender {...formProps} fields={schema} onUpdate={onUpdate} />
          </div>
        </div>
      </Container>
    </div>
  );
}
