import { FC, HTMLAttributes } from "react";
import { pspIcons } from "./icons-svg";
import { PspIconsNames } from "./iconsName";
import styled from "styled-components";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  name: PspIconsNames;
  size?: number;
  color?: string;
}

export const PspIcons: FC<IProps> = ({ name, size, color, ...restProps }) => {
  return (
    <IconStyle $size={size} $color={color} {...restProps}>
      {pspIcons[name]}
    </IconStyle>
  );
};

const IconStyle = styled.span<{
  $size: number | undefined;
  $color: string | undefined;
}>`
  ${({ $size }) => {
    if ($size) {
      return `
    svg{
    width:${$size}px;
    height:${$size}px;
    }
    `;
    }
  }}
  ${({ $color }) => {
    if ($color) {
      return `
    svg{
    path{
    fill:${$color};
    }
    }
    `;
    }
  }}
`;
