import { Form } from "antd";
import styled from "styled-components";

export const FormItemContainer = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0px 12px 4px 12px !important;
  }
  label {
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: unset;
  }
  label::before {
    content: unset !important;
  }
  label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::after {
    display: inline-block !important;
    margin-inline-end: 4px !important;
    color: ${({ theme }) => theme.colors.base.danger[600]} !important;
    font-size: 12px !important;
    /* font-family: SimSun, sans-serif !important; */
    line-height: 1 !important;
    content: "*" !important;
    visibility: visible !important;
  }
`;
