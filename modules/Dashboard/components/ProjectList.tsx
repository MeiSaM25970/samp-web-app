"use client";
import { Col } from "antd";
import { FC } from "react";
import { ProjectListContainer } from "../styles/ProjectList.style";
import { Filter } from "./Filter";
import { ProjectCard } from "./Card";
import { useDashboard } from "../context";

export const ProjectList: FC = () => {
  const { projectList, setFilter } = useDashboard();
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={4}>
        <Filter setFilter={setFilter} />
      </Col>
      <Col span={20} className="ps-[10px]">
        <ProjectCard project={projectList && projectList[0]} />
      </Col>
    </ProjectListContainer>
  );
};
