import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

 * :not(.material-icons , .material-symbols-outlined){
  font-family:  ${(props) =>
    props.theme.isRtl ? "IRANSansXFaNum" : "Roboto"} !important;
}
body{
  margin: unset !important;
  background-color: ${(props) => props.theme.colors.background.bg2} !important;
}

.ant-select-item.ant-select-item-option{
    color: ${(props) => props.theme.colors.dropdownList.DDDefText} !important;
  }

/* ------------------- Override Css --------------------- */

  /* Button */

  .ant-btn {
    min-width: 122px;
  }
  .ant-btn:focus,
  .ant-btn:focus-visible {
    outline: unset;
  }
  .ant-btn-color-green {
    box-shadow: unset;
  }
  /* ---- */
  .ant-btn-color-primary.ant-btn-variant-text:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    background: ${(props) => props.theme.colors.background.baseBg} !important;
  }
  .ant-btn-color-primary.ant-btn-variant-solid:disabled {
    background-color: ${(props) =>
      props.theme.colors.buttons.primary.priDisBut};
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri};
  }
  /* --- */
  .ant-btn-primary.ant-btn-variant-outlined:disabled,
  .ant-btn-color-primary.ant-btn-variant-outlined:disabled {
    background-color: transparent;
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
    border-color: ${(props) =>
      props.theme.colors.buttons.primary.strokeButDisPri};
  }
  .ant-btn-primary.ant-btn-variant-outlined:not(:disabled):not(
      .ant-btn-disabled
    ):hover,
  .ant-btn-color-primary.ant-btn-variant-outlined:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
    border-color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
  }
  /* ---- */
  .ant-btn-primary.ant-btn-variant-dashed,
  .ant-btn-color-primary.ant-btn-variant-dashed {
    border-color: ${(props) => props.theme.colors.buttons.primary.strokeButPri};
    color: ${(props) => props.theme.colors.buttons.primary.tButPri};
  }
  .ant-btn-primary.ant-btn-variant-dashed:disabled,
  .ant-btn-color-primary.ant-btn-variant-dashed:disabled {
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
    background: transparent;
    border: 1px dashed
      ${(props) => props.theme.colors.buttons.primary.strokeButDisPri};
  }
  .ant-btn-primary.ant-btn-variant-dashed:not(:disabled):not(
      .ant-btn-disabled
    ):hover,
  .ant-btn-color-primary.ant-btn-variant-dashed:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    border-color: ${(props) =>
      props.theme.colors.buttons.primary.strokeButDisPri};
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
    background-color: transparent;
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
  }
  .ant-btn-color-primary.ant-btn-variant-text:disabled {
    color: ${(props) => props.theme.colors.buttons.primary.tButDisPri2};
    background-color: transparent;
    border: unset;
  }
  /* ---- */
  .ant-btn-color-dangerous.ant-btn-variant-solid:disabled {
    border-color: ${(props) => props.theme.colors.buttons.danger.danDisBUt};
    color: ${(props) => props.theme.colors.buttons.danger.tButDisDan};
    background-color: ${(props) => props.theme.colors.buttons.danger.danDisBUt};
  }
  .ant-btn-color-dangerous.ant-btn-variant-outlined:not(:disabled):not(
      .ant-btn-disabled
    ):hover,
  .ant-btn-color-dangerous.ant-btn-variant-dashed:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    border-color: ${(props) =>
      props.theme.colors.buttons.danger.strokeButDisDan};
    color: ${(props) => props.theme.colors.buttons.danger.tButDisDan};
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    background-color: transparent;
  }
  .ant-btn-color-dangerous.ant-btn-variant-outlined:disabled,
  .ant-btn-dashed.ant-btn-dangerous:disabled {
    border-color: ${(props) =>
      props.theme.colors.buttons.danger.strokeButDisDan};
    color: ${(props) => props.theme.colors.buttons.danger.tButDisDan};
    background-color: transparent;
  }
  .ant-btn-dashed.ant-btn-dangerous {
    border-color: ${(props) => props.theme.colors.buttons.danger.strokeButDan};
    color: ${(props) => props.theme.colors.buttons.danger.tDanBut};
  }
  .ant-btn-color-dangerous.ant-btn-variant-dashed:disabled {
    border-color: ${(props) =>
      props.theme.colors.buttons.danger.strokeButDisDan};
    color: ${(props) => props.theme.colors.buttons.danger.tButDisDan};
    background-color: transparent;
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
  }
  .ant-btn-color-dangerous.ant-btn-variant-text:disabled {
    color: ${(props) => props.theme.colors.buttons.danger.tButDisDan};
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    background-color: transparent;

    border: unset;
  }
  .ant-btn-color-dangerous.ant-btn-variant-text:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    background: ${(props) => props.theme.colors.background.baseBg} !important;
  }
  /* ---- */
  .ant-btn-default:disabled,
  .ant-btn-color-default:disabled {
    color: ${(props) => props.theme.colors.buttons.default.tButDisDef};
    background-color: ${(props) =>
      props.theme.colors.buttons.default.defDisBut};
    border-color: ${(props) => props.theme.colors.buttons.default.defBut};
  }
  .ant-btn-variant-outlined.ant-btn-background-ghost {
    color: ${(props) => props.theme.colors.buttons.default.tButDef2};
  }
  .ant-btn-variant-outlined.ant-btn-background-ghost:hover {
    border-color: ${(props) => props.theme.colors.base.gray[400]};
    color: ${(props) => props.theme.colors.base.gray[400]};
  }
  .ant-btn-variant-outlined.ant-btn-background-ghost:disabled {
    border-color: ${(props) => props.theme.colors.base.gray[400]};
    color: ${(props) => props.theme.colors.base.gray[400]};
    background-color: transparent;
  }
  /* --- */
  .ant-btn-dashed.ant-btn-color-default.ant-btn-variant-dashed {
    border: 1px dashed
      ${(props) => props.theme.colors.buttons.default.strokeButDef};
    background-color: transparent;
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
  }
  .ant-btn-dashed.ant-btn-color-default.ant-btn-variant-dashed:disabled {
    border-color: ${(props) =>
      props.theme.colors.buttons.default.strokeButDisDef};
  }
  .ant-btn-dashed.ant-btn-color-default.ant-btn-variant-dashed:hover {
    border-color: ${(props) =>
      props.theme.colors.buttons.default.strokeButDisDef};
    color: ${(props) => props.theme.colors.buttons.default.tButDisDef};
  }
  .ant-btn-variant-text:disabled,
  .ant-btn-variant-text.ant-btn-disabled {
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    background-color: transparent;

    border: unset;
  }
  /* --- */
  .ant-btn-color-green.ant-btn-variant-solid:disabled {
    color: ${(props) => props.theme.colors.buttons.success.tButDisSuc2};
    background-color: ${(props) =>
      props.theme.colors.buttons.success.sucDisBut};
    border-color: ${(props) => props.theme.colors.buttons.success.sucDisBut};
  }
  .ant-btn-color-green.ant-btn-variant-outlined:disabled {
    color: ${(props) => props.theme.colors.buttons.success.tButDisSuc};
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    background-color: transparent;
    border-color: ${(props) =>
      props.theme.colors.buttons.success.strokeButDisSuc};
  }
  .ant-btn-color-green.ant-btn-variant-dashed:disabled {
    color: ${(props) => props.theme.colors.buttons.success.tButDisSuc};
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    background-color: transparent;
    border-color: ${(props) =>
      props.theme.colors.buttons.success.strokeButDisSuc};
  }

  .ant-btn-color-green.ant-btn-variant-text:disabled {
    color: ${(props) => props.theme.colors.buttons.success.tButDisSuc};
    background-color: transparent;
    /* background-color: ${(props) => props.theme.colors.background.baseBg}; */
    border: unset;
  }
  .ant-btn-color-green.ant-btn-variant-text:not(:disabled):not(
      .ant-btn-disabled
    ):hover {
    background: ${({ theme: { colors } }) => colors.background.baseBg};
  }
  /* --- */
  /* End Button */

  /* Inputs */
  .ant-input.ant-input-disabled {
    border-color: ${(props) => props.theme.colors.inputs.stroke.dontEditBorder};
  }
  .ant-picker-small {
    height: 48px;
  }
  .ant-radio-button-wrapper-checked {
    color: ${(props) => props.theme.colors.text.whiteText};
  }
  .ant-radio-wrapper .ant-radio-disabled .ant-radio-inner {
    border-color: ${(props) => props.theme.colors.icon.icDisable};
  }
  .ant-radio-button-wrapper-disabled {
    border-color: ${(props) => props.theme.colors.icon.icDisable};
  }
  .ant-radio-wrapper
    .ant-radio-disabled.ant-radio-checked
    .ant-radio-inner::after {
    transform: scale(0.6);
  }
  .ant-checkbox-disabled .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.icon.icDisable};
  }
  .ant-checkbox-wrapper-checked .ant-checkbox-disabled .ant-checkbox-inner {
    background: ${(props) => props.theme.colors.icon.icDisable};
  }
  /*End Inputs */
  /* Table */

  .ant-table-wrapper .ant-table-tbody > tr {
    &:nth-child(odd) {
      background: ${({ theme }) => theme.colors.table.bg.rowContrast};
    }
  }
  .ant-table-pagination {
    margin: 8px 0 0 0 !important;
    border-top: 1px solid ${({ theme }) => theme.colors.table.stroke.cellSTR};
    padding: 16px 0 4px 0;
    svg {
      width: 8px;
      height: 8px;
    }
    .ant-pagination-options-size-changer {
      height: 22px !important;
    }
    .ant-select-selector {
      border: 1px solid ${({ theme }) => theme.colors.border.bor1};
      background: transparent;
      border-radius: 4px;
      font-size: 10px;
      color: ${({ theme }) => theme.colors.text.primaryText};
    }
  }
  /*End Table */

/* ------------------- Override Css --------------------- */
::-webkit-scrollbar {
  width: 6px;
  height:5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.colors.border.bor6};
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.colors.disable.disable1};
  border-radius: 2px;
  background-clip: content-box;
  width: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.colors.disable.baseDisable} !important;
}


/* sweet alert */
.swal2-icon{
  border-color:transparent !important;
  border:unset !important;
  margin:0 auto !important;
  width: 40px;
  height: 40px;

}
.swal2-popup.swal2-modal{
  padding: 24px;
  border-radius: 20px ;
}
.swal2-title{
  padding-top:8px;
  padding-bottom: 16px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.base.danger[700]} ;

}
.swal2-html-container{
  color: ${(props) => props.theme.colors.text.thirdText} !important;
text-align: center !important;
font-size: 12px !important;
font-style: normal !important;
font-weight: 500 !important;
line-height: normal !important;
padding: 0 0 16px !important;
}
.swal2-actions{
  margin: unset !important;
}
.swal2-confirm.swal2-styled{
  width: 100% !important;
  border-radius: 8px;
background: ${(props) => props.theme.colors.base.gray[100]} !important;
color: ${(props) => props.theme.colors.base.gray[600]} !important;
color: var(--color-Gray-Gray-600, #4B4B4B);
text-align: center;
font-size: 10px;
font-style: normal;
font-weight: 500;
line-height: normal;
padding: 10px 12px;

}
.swal2-styled:hover{
 background-image :unset !important ;
 background :${(props) => props.theme.colors.base.gray[200]} !important ;
}
/* end sweet alert */

/* auto fill */
input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text !important;
      -webkit-box-shadow: 0 0 0 30px ${(props) =>
        props.theme.colors.base.gray[100]} inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  /* end auto fill */

 

 
`;
