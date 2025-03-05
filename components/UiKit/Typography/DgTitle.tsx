"use client";

import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
export const DgTitle: FC<IProps & PropsWithChildren> = (props) => {
  return <Container {...props} />;
};

const Container = styled.div`
  color: ${(props) => props.theme.colors.text.primaryText};
  font-size: 18px;
  font-weight: 700;
`;
