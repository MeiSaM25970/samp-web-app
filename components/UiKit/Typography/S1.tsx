"use client";
import { breakPointsLg } from "@/constants/screen";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

// interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
export const S1: FC<PropsWithChildren> = (props) => {
  return <Container {...props} />;
};

const Container = styled.div`
  color: ${(props) => props.theme.colors.text.primaryText};
  font-size: 32px;
  font-weight: 500;

  @media only screen and (max-width: ${breakPointsLg}px) {
    & {
      font-size: 24px;
    }
  }
`;
