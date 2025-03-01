import { breakPointsLg } from "src/constants/screen";
import styled from "styled-components";

export const ChooseLanguageContainer = styled.div`
  .ant-select {
    width: 104px !important;
    height: 40px !important;
    line-height: 48px !important;
    border-radius: 8px !important;
    background: ${(props) => props.theme.colors.background.bg1};
  }

  .ant-select-selector {
    border-radius: 8px !important;
    padding: 15px 12px 15px 16px;
    box-shadow: 2px 15px 25px 0px rgba(107, 114, 128, 0.06);
    border: unset !important;
    background: ${(props) => props.theme.colors.background.bg1} !important;
  }
  .ant-select .ant-select-arrow {
    top: 18px !important;
  }
  .ant-select-selection-item {
    padding-inline-end: unset !important;
  }
  @media only screen and (min-width: ${breakPointsLg}px) {
    .ant-select {
      height: 48px;
    }
  }
`;
