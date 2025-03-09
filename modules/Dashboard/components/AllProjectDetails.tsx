"use client";
import { Col, Row, ColProps, Flex, Progress } from "antd";
import { FC, ReactNode, useMemo } from "react";
import { AllProjectsDetailsContainer } from "../styles/allProjectsDetails.style";

import { ProjectText } from "./ProjectText";
import { useDashboard } from "../context";
import { useTheme } from "@/app/theme";
import { C7 } from "@/components/UiKit/Typography";

interface IMapData {
  label: ReactNode;
  value: ReactNode;
  hasPrefix?: boolean;
  colProps: ColProps;
}
interface IData {
  row1: IMapData[];
  row2: IMapData[];
}
export const AllProjectsDetails: FC = () => {
  const { projectDetails } = useDashboard();
  const {
    theme: { colors },
  } = useTheme();
  const data: IData = useMemo(
    () => ({
      row1: [
        {
          label: "کل پروژه ها:",
          value: projectDetails?.CountAll,
          colProps: {
            span: 6,
          },
          hasPrefix: false,
        },
        {
          label: "اعتبار پیش بینی شده :",
          value: projectDetails?.Sum_PishBini,
          colProps: {
            span: 9,
          },
        },
        {
          label: "اعتبار مصوب :",
          value: projectDetails?.Sum_BudjeMosavab,
          colProps: {
            span: 9,
          },
        },
      ],
      row2: [
        {
          label: "مبلغ صورت وضعیت ها :",
          value: projectDetails?.Sum_SooratVazeiyat,
          colProps: {
            span: 12,
          },
        },
        {
          label: "مبلغ صورت وضعیت تایید شده :",
          value: projectDetails?.Sum_SooratVazeiyat_TaeidShode,
          colProps: {
            span: 12,
          },
        },
      ],
    }),
    [projectDetails]
  );

  return (
    <AllProjectsDetailsContainer>
      <Col span={17}>
        <Row>
          {data.row1.map((item, index) => (
            <Col {...item.colProps} key={index}>
              <ProjectText
                label={item.label}
                value={
                  Number(item.value)
                    ? Number(item.value).toLocaleString("fa-IR")
                    : "--"
                }
                hasPrefix={item.hasPrefix}
              />
            </Col>
          ))}
        </Row>
        <Row className="mt-[16px]">
          {data.row2.map((item, index) => (
            <Col {...item.colProps} key={index}>
              <ProjectText
                label={item.label}
                value={
                  Number(item.value)
                    ? Number(item.value).toLocaleString("fa-IR")
                    : "--"
                }
                hasPrefix={item.hasPrefix}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={7}>
        <Flex gap="small" wrap justify="space-between">
          <Flex gap={6} vertical align="center">
            <Progress
              trailColor="#CACACA"
              type="circle"
              percent={projectDetails?.Percent_Progressed}
              strokeColor={{
                "0%":
                  projectDetails &&
                  projectDetails.Percent_Progressed <
                    projectDetails.Percent_Progressed_Submited
                    ? colors.icon.icDan
                    : colors.icon.icSuc,
                "100%":
                  projectDetails &&
                  projectDetails.Percent_Progressed <
                    projectDetails.Percent_Progressed_Submited
                    ? colors.icon.icDan
                    : colors.icon.icSuc,
              }}
              size={54}
              status="active"
            />
            <C7 style={{ color: colors.text.secondaryText }}>
              پیشرفت پروژه اعلام شده
            </C7>
          </Flex>
          <Flex gap={6} vertical align="center">
            <Progress
              type="circle"
              percent={projectDetails?.Percent_Progressed_Submited}
              status="active"
              trailColor="#CACACA"
              size={54}
              strokeColor={{
                "0%":
                  projectDetails &&
                  projectDetails.Percent_Progressed >
                    projectDetails.Percent_Progressed_Submited
                    ? colors.icon.icDan
                    : colors.icon.icSuc,
                "100%":
                  projectDetails &&
                  projectDetails.Percent_Progressed >
                    projectDetails.Percent_Progressed_Submited
                    ? colors.icon.icDan
                    : colors.icon.icSuc,
              }}
            />
            <C7 style={{ color: colors.text.secondaryText }}>
              پیشرفت پروژه تایید شده
            </C7>
          </Flex>
        </Flex>
      </Col>
    </AllProjectsDetailsContainer>
  );
};
