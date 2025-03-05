"use client";
import { breakPointsLg } from "@/constants/screen";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
export const C5: FC<IProps & PropsWithChildren> = (props) => {
  return <Container {...props} />;
};

const Container = styled.div`
  color: ${(props) => props.theme.colors.text.primaryText};
  font-size: 14px;
  font-weight: 700;

  @media only screen and (max-width: ${breakPointsLg}px) {
    & {
      font-size: 12px;
    }
  }
`;
