import React from "react";
import Form from "./Form";
import { TextInput } from "./inputs";
import { useNavigate } from "react-router-dom";
import { IconTextButton } from "../button";

interface FieldsType {
  label?: string;
  type?: any;
  placeholder?: string;
  name: string;
  Field?: (props: any) => JSX.Element;
  value?: string;
  validate?: boolean;
  hintText?: string;
  options?: { [key: string]: any };
  defaultOption?: { [key: string]: any };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

export type onClickType = () => Promise<boolean>;

export default function FormRender(props: {
  fields: Array<FieldsType>;
  children?: React.ReactNode;
  data: any;
  errors: any;
  setData: any;
  onSave?: onClickType;
  onUpdate?: onClickType;
  onSaveStay?: () => Promise<void>;
  onClear?: () => void;
  showCancel?: boolean;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setData({ ...props.data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onCancel = () => navigate(-1);

  return (
    <Form>
      {props.fields.map((item, index) => {
        if (item.Field) {
          const { Field } = item;
          return (
            <Field
              key={index.toString()}
              data={props.data}
              name={item.name}
              value={props.data[item.name]}
              setData={props.setData}
              label={item.label}
              hint={props.errors[item.name]?.hintText}
              onChange={(e: any) => {
                onChange(e);
                item.onChange && item.onChange(e);
              }}
              hintColor={
                item.validate
                  ? props.errors[item.name]?.error
                    ? "red"
                    : "green"
                  : "base"
              }
            />
          );
        } else {
          return (
            <TextInput
              key={index.toString()}
              type={item.type}
              label={item.label}
              placeholder={item.placeholder}
              name={item.name}
              onChange={(e) => {
                onChange(e);
                item.onChange && item.onChange(e);
              }}
              value={props.data[item.name]}
              maxLength={item.maxLength}
              hint={props.errors[item.name]?.hintText}
              hintColor={
                item.validate
                  ? props.errors[item.name]?.error
                    ? "red"
                    : "green"
                  : undefined
              }
            />
          );
        }
      })}
      {props.children}
      <div className="mt-5 flex flex-row flex-wrap gap-2 justify-center">
        {props.onSave && (
          <IconTextButton
            onClick={async () => {
              if (props.onSave) {
                const res = await props.onSave();
                if (res) {
                  navigate(-1);
                }
              }
            }}
            color="success"
            title="Save"
            IconNode={undefined}
          />
        )}
        {props.onSaveStay && (
          <IconTextButton
            onClick={async () => {
              if (props.onSaveStay) {
                props.onSaveStay();
              }
            }}
            color="success"
            title="Save Stay"
            IconNode={undefined}
          />
        )}
        {props.onUpdate && (
          <IconTextButton
            onClick={async () => {
              if (props.onUpdate) {
                const res = await props.onUpdate();
                if (res) {
                  navigate(-1);
                }
              }
            }}
            color="success"
            title="Update"
            IconNode={undefined}
          />
        )}
        {props.onClear && (
          <IconTextButton
            onClick={async () => {
              if (props.onClear) {
                props.onClear();
              }
            }}
            color="primary"
            title="Clear Now"
            IconNode={undefined}
          />
        )}
        {!props.showCancel && (
          <IconTextButton
            onClick={onCancel}
            color="light"
            title="Cancel"
            IconNode={undefined}
          />
        )}
      </div>
    </Form>
  );
}
