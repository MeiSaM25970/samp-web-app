"use client";
import { Col, Flex, Input, InputRef, Pagination, Row, Spin } from "antd";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { C8 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { useDashboard } from "../../context";
import { ProjectListContainer } from "../../styles/ProjectList.style";
import { FilterModalMobile } from "./FilterModal";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCardMobile } from "./Card";

export const ProjectListMobile: FC = () => {
  const { projectList, loading, filter, setShowFilter, search, setSearch } =
    useDashboard();
  const [showInput, setShowInput] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);
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

  const showSearch = () => {
    setShowInput((prev) => !prev);
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
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);
  return (
    <ProjectListContainer className="mt-[12px]">
      <Col span={24}>
        <Flex justify="space-between">
          <span
            className="filterIcon"
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
          <Flex>
            <AnimatePresence>
              {showInput && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Input
                    placeholder="جستجوی کد پروژه"
                    ref={inputRef}
                    style={{
                      height: 40,
                      padding: "8px",
                      border: 0,
                      background: colors.background.baseBg,
                    }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.span
              className="searchIcon"
              style={{
                background: colors.background.baseBg,
                width: 40,
                height: 40,
                borderRadius: showInput ? "8px 0 0 8px" : "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={showSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icons name="Search" />
            </motion.span>
          </Flex>
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
                  <ProjectCardMobile project={project} key={index} />
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
