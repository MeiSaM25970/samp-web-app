"use client";
import { Col, Flex, Pagination, Row } from "antd";
import { FC, useMemo, useState } from "react";
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
  const data = useMemo(() => {
    if (projectList) return [...projectList];
    else return [];
  }, [projectList]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handlePageChange = (page: number, pageSize: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageSize(pageSize);
    setCurrentPage(page);
  };

  const startIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize]
  );
  const endIndex = useMemo(() => startIndex + pageSize, [startIndex, pageSize]);
  const currentData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={4}>
        <Filter options={options} />
      </Col>

      <Col span={20} className="ps-[10px]">
        <Row>
          <Col span={24}>
            <Flex vertical gap={24}>
              {currentData.map((project, index) => (
                <ProjectCard project={project} key={index} />
              ))}
            </Flex>
          </Col>
          <Col span={24} className="pt-[32px]">
            <Pagination
              current={currentPage}
              total={data.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              align="center"
              className="flex items-center"
            />
          </Col>
        </Row>
      </Col>
    </ProjectListContainer>
  );
};
