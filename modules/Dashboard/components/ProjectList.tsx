"use client";
import { Col } from "antd";
import { FC } from "react";
import { ProjectListContainer } from "../styles/ProjectList.style";
import { Filter } from "./Filter";
import { IFilterOptions } from "@/app/actions/models";
import { ProjectCard } from "./Card";
import { useDashboard } from "../context";

interface IProps {
  options: IFilterOptions | undefined;
}
export const ProjectList: FC<IProps> = ({ options }) => {
  const { projectList } = useDashboard();
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={4}>
        <Filter options={options} />
      </Col>
      <Col span={20} className="ps-[10px]">
        <ProjectCard project={projectList && projectList[0]} />
      </Col>
    </ProjectListContainer>
  );
};
