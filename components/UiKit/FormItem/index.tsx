import { FC, PropsWithChildren } from "react";
import { FormItemContainer } from "./styled";
import { FormItemProps } from "antd/lib/form";

export const FormItem: FC<PropsWithChildren<FormItemProps>> = (props) => {
  return (
    <FormItemContainer
      labelCol={{
        span: 24,
      }}
      {...props}
    >
      {props.children}
    </FormItemContainer>
  );
};
