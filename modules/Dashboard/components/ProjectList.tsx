"use client";
import { Col, Flex, Pagination, Row, Spin } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { ProjectListContainer } from "../styles/ProjectList.style";
import { Filter } from "./Filter";
import { ProjectCard } from "./Card";
import { useDashboard } from "../context";
import { C8 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { ProjectTable } from "./Table";

export const ProjectList: FC = () => {
  const { projectList, loading, filter, setFilter } = useDashboard();
  const data = useMemo(() => {
    if (projectList) return [...projectList];
    else return [];
  }, [projectList]);
  const {
    theme: { colors },
  } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showTable, setShowTable] = useState<boolean>(false);

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
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={4}>
        <Filter setFilter={setFilter} />
      </Col>

      <Col span={20} className="ps-[10px]">
        <span
          className="  rounded-[8px] flex items-center justify-center ms-[16px] mb-[24px] cursor-pointer transition-all"
          style={{
            background: showTable
              ? colors.background.hoverBg
              : colors.background.baseBg,
            width: 40,
            height: 40,
          }}
          onClick={() => {
            setShowTable((prev) => !prev);
          }}
        >
          <Icons name="Table" />
        </span>
        {showTable ? (
          <ProjectTable />
        ) : (
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
        )}
      </Col>
    </ProjectListContainer>
  );
};
