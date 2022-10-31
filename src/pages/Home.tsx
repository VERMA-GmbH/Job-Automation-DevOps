import React from "react";
import { Text } from "../components/main";
import { IconTextButton } from "../components/main/button";
import { Container } from "../components/utils";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContactCard from "../components/card/ContactCard";
import curd from "../database/curd";

export default function Home() {
  const [data, setData] = React.useState<Array<{ [key: string]: any }>>([]);
  const navigate = useNavigate();
  const addNewContact = () => navigate("/add-new-contact");
  const edit = (id: string) => navigate(`edit-contact/${id}`);
  const remove = (id: string) => {
    curd.remove(id);
    setData(curd.getAll());
  };

  React.useEffect(() => {
    setData(curd.getAll());
  }, []);

  return (
    <div>
      <Container>
        <main className="px-4">
          <Text.Title title="Contact Team">
            <IconTextButton
              title="New"
              IconNode={<FaPlus size={15} />}
              onClick={addNewContact}
              color="success"
            />
          </Text.Title>
          <Text.Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
            sed quaerat nostrum dolorum unde sit culpa illum fugiat? Laudantium
            consequatur eligendi nisi omnis animi sequi laborum, earum eveniet
            esse numquam.
          </Text.Paragraph>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {data.map((item, index) => (
              <ContactCard
                firstName={item.first_name}
                lastName={item.last_name}
                email={item.email}
                onUpdate={() => edit(item.id)}
                onDelete={() => remove(item.id)}
                key={index.toString()}
              />
            ))}
          </div>
        </main>
      </Container>
    </div>
  );
}
