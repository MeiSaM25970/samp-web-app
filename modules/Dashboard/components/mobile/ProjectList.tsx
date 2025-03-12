"use client";
import { Col, Flex, Pagination, Row, Spin } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { C8 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { useDashboard } from "../../context";
import { ProjectListContainer } from "../../styles/ProjectList.style";
import { ProjectCard } from "../Card";
import { FilterModalMobile } from "./FilterModal";

export const ProjectListMobile: FC = () => {
  const { projectList, loading, filter, setShowFilter } = useDashboard();

  const data = useMemo(() => {
    if (projectList) return [...projectList];
    else return [];
  }, [projectList]);

  const {
    theme: { colors },
  } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handlePageChange = (page: number, pageSize: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageSize(pageSize);
    setCurrentPage(page);
  };
  const showModal = () => {
    setShowFilter(true);
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
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={24} className="ps-[10px]">
        <Flex justify="space-between">
          <span
            className="rounded-[8px] flex items-center justify-center mb-[24px] cursor-pointer transition-all"
            style={{
              background: colors.background.baseBg,
              width: 40,
              height: 40,
            }}
            onClick={() => {
              showModal();
            }}
          >
            <Icons name="Filter" />
          </span>
          <span
            className="  rounded-[8px] flex items-center justify-center mb-[24px] cursor-pointer transition-all"
            style={{
              background: colors.background.baseBg,
              width: 40,
              height: 40,
            }}
            onClick={() => {}}
          >
            <Icons name="Search" />
          </span>
        </Flex>
        <Row>
          <Col span={24} style={{ minHeight: 400 }}>
            <Flex vertical gap={24}>
              {loading ? (
                <Flex
                  justify="center"
                  align="center"
                  vertical
                  style={{ height: 400 }}
                  gap={24}
                >
                  <Spin size="small" />
                  <C8>در حال بارگذاری...</C8>
                </Flex>
              ) : (
                currentData.map((project, index) => (
                  <ProjectCard project={project} key={index} />
                ))
              )}
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
        <FilterModalMobile />
      </Col>
    </ProjectListContainer>
  );
};
