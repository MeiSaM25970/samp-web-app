"use client";
import { FC } from "react";
import { CardContainer } from "../styles/card.style";
import { Flex } from "antd";
import { IProject } from "@/app/actions/models";
import Image from "next/image";

interface IProps {
  project: IProject | undefined;
}
export const ProjectCard: FC<IProps> = ({ project }) => {
  console.log(project);
  return (
    <CardContainer gap={40}>
      <Flex vertical className="w-[150px]">
        <div
          style={{
            width: 150,
            height: 150,
            background: "url(/images/project.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
            borderRadius: 12,
            border: "2px solid var(--Border-Bor-6, #E1E1E1)",
          }}
        >
          <span className="w-[28px] h-[28px] bg-[#CACACA] rounded-[2px] rounded-br-[12px]  absolute right-0 bottom-0 flex justify-center items-center">
            1/5
          </span>
        </div>
      </Flex>
      <Flex className="w-full">
        <div></div>
      </Flex>
    </CardContainer>
  );
};
