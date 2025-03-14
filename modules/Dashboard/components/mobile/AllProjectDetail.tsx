"use client";
import { Col, Row, ColProps, Flex, Progress } from "antd";
import { FC, ReactNode, useMemo } from "react";
import { useTheme } from "@/app/theme";
import { C9 } from "@/components/UiKit/Typography";
import { IProjectDetail } from "@/app/actions/models";
import { AllProjectsDetailsMobileContainer } from "../../styles/mobile/allProjectsDetails.style";
import { ProjectTextMobile } from "../mobile/ProjectText";

interface IMapData {
  label: ReactNode;
  value: ReactNode;
  hasPrefix?: boolean;
  colProps: ColProps;
}
interface IData {
  row: IMapData[];
}
interface IProps {
  projectDetails: IProjectDetail | undefined;
  projectDetailsLoading?: boolean;
}
export const AllProjectsDetailsMobile: FC<IProps> = ({
  projectDetails,
  projectDetailsLoading,
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const data: IData = useMemo(
    () => ({
      row: [
        {
          label: "کل پروژه ها:",
          value: projectDetails?.CountAll,
          colProps: {
            span: 24,
          },
          hasPrefix: false,
        },
        {
          label: "اعتبار پیش بینی شده :",
          value: projectDetails?.Sum_PishBini,
          colProps: {
            span: 24,
          },
        },
        {
          label: "اعتبار مصوب :",
          value: projectDetails?.Sum_BudjeMosavab,
          colProps: {
            span: 24,
          },
        },
        {
          label: "مبلغ صورت وضعیت ها :",
          value: projectDetails?.Sum_SooratVazeiyat,
          colProps: {
            span: 24,
          },
        },
        {
          label: "مبلغ صورت وضعیت تایید شده :",
          value: projectDetails?.Sum_SooratVazeiyat_TaeidShode,
          colProps: {
            span: 24,
          },
        },
      ],
    }),
    [projectDetails]
  );

  return (
    <AllProjectsDetailsMobileContainer>
      <Col span={24}>
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
            <C9 style={{ color: colors.text.secondaryText }}>
              پیشرفت پروژه اعلام شده
            </C9>
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
            <C9 style={{ color: colors.text.secondaryText }}>
              پیشرفت پروژه تایید شده
            </C9>
          </Flex>
        </Flex>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 12]}>
          {data.row.map((item, index) => (
            <Col {...item.colProps} key={index}>
              <ProjectTextMobile
                loading={projectDetailsLoading}
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
    </AllProjectsDetailsMobileContainer>
  );
};
