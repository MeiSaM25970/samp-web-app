"use client";
import { FC } from "react";
import { CardContainer } from "../styles/card.style";
import { Button, Col, Flex, Progress, Row } from "antd";
import { IProject } from "@/app/actions/models";
import {
  C1,
  C2,
  C3,
  C4,
  C5,
  C7,
  C8,
  C9,
  T4,
  T5,
  T6,
} from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";
import Icons from "espil-icons";

interface IProps {
  project: IProject | undefined;
}

export const ProjectCard: FC<IProps> = ({ project }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <CardContainer>
      <Col span={4} className="pl-[40px] ">
        <Flex vertical justify="space-between" className="h-[248px]">
          <Flex vertical>
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
              {/* <span className="w-[28px] h-[28px] bg-[#CACACA] rounded-[2px] rounded-br-[12px]  absolute right-0 bottom-0 flex justify-center items-center">
              1/5
            </span> */}
            </div>
          </Flex>
          <Flex vertical>
            <Flex gap={6} vertical className="w-[150px]">
              <Flex justify="space-between">
                <C8 style={{ color: colors.text.thirdText }}>میزان پیشرفت :</C8>
                <C5>{project?.PhisicalProgress || 0}%</C5>
              </Flex>
              <Progress
                className="!w-full"
                trailColor="rgb(202, 202, 202)"
                percent={project?.PhisicalProgress}
                type="line"
                status="active"
                showInfo={false}
              />
            </Flex>
            <Flex justify="space-between" className="w-[150px]">
              <C8 style={{ color: colors.text.thirdText }}>
                {project?.Prj_StartDate}
              </C8>
              <C8 style={{ color: colors.text.thirdText }}>
                {project?.Prj_FinishDate}
              </C8>
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col span={20}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Flex gap={4} align="center" vertical>
              <Flex align="center" className="w-full" justify="space-between">
                <Flex align="center">
                  <Flex gap={12} className="!pl-[24px]" align="center">
                    <T6 style={{ color: colors.text.secondaryText }}>
                      {project?.Prj_ID}
                    </T6>
                    <T4 style={{ color: colors.icon.icDef2 }}>_</T4>
                    <T5 style={{ color: colors.text.title }}>
                      {project?.Prj_Name}
                    </T5>
                  </Flex>
                  <Flex gap={8} className="!h-[32px]">
                    <C3
                      style={{
                        color: colors.text.secondaryText,
                      }}
                    >
                      {project?.Province}
                    </C3>
                    <div className="rectHolder"></div>
                    <C3 style={{ color: colors.text.secondaryText }}>
                      {project?.City}
                    </C3>
                  </Flex>
                </Flex>
                <C9
                  className="statusHolder"
                  style={{ color: colors.chips.text.green }}
                >
                  {project?.ExecuteState}
                </C9>
              </Flex>
              <Row className="w-full mt-[12px] leading-[32px]" gutter={[0, 12]}>
                <Col span={8}>
                  <Flex gap={12}>
                    <C2
                      style={{
                        color: colors.text.thirdText,
                      }}
                    >
                      عرصه :
                    </C2>
                    <C2
                      style={{
                        color: colors.text.primaryText,
                      }}
                    >
                      {project?.Prj_AreaType}
                    </C2>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex gap={12}>
                    <C2
                      style={{
                        color: colors.text.thirdText,
                      }}
                    >
                      زیر عرصه :
                    </C2>
                    <C2
                      style={{
                        color: colors.text.primaryText,
                      }}
                    >
                      {project?.Prj_SubjectType}
                    </C2>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex gap={12}>
                    <C2
                      style={{
                        color: colors.text.thirdText,
                      }}
                    >
                      طرح :
                    </C2>
                    <C2
                      style={{
                        color: colors.text.primaryText,
                      }}
                    >
                      {project?.PlanGroup}
                    </C2>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex gap={12}>
                    <C2
                      style={{
                        color: colors.text.thirdText,
                      }}
                    >
                      نوع پروژه :
                    </C2>
                    <C2
                      style={{
                        color: colors.text.primaryText,
                      }}
                    >
                      {project?.TechnicalType}
                    </C2>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex gap={12}>
                    <C2
                      style={{
                        color: colors.text.thirdText,
                      }}
                    >
                      مجری :
                    </C2>
                    <C2
                      style={{
                        color: colors.text.primaryText,
                      }}
                    >
                      {project?.Unit}
                    </C2>
                  </Flex>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col span={24}>
            <Row align={"bottom"} className="pt-[8px]">
              <Col span={21}>
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Flex gap={16} className="grayHolder">
                      <C4 style={{ color: colors.text.secondaryText }}>
                        اعتبار پیش بینی شده
                      </C4>
                      <div className="rectHolder"></div>
                      <C1 style={{ color: colors.text.primaryText }}>
                        {project && project?.Prj_TotalCredit !== undefined
                          ? Number(project?.Prj_TotalCredit).toLocaleString(
                              "fa-IR"
                            )
                          : "--"}
                      </C1>
                      <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex gap={16} className="grayHolder">
                      <C4 style={{ color: colors.text.secondaryText }}>
                        اعتبار مصوب{" "}
                      </C4>
                      <div className="rectHolder"></div>
                      <C1 style={{ color: colors.text.primaryText }}>
                        {project && project?.CreditAllocation !== undefined
                          ? Number(project?.CreditAllocation).toLocaleString(
                              "fa-IR"
                            )
                          : "--"}
                      </C1>
                      <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex gap={16} className="grayHolder">
                      <C4 style={{ color: colors.text.secondaryText }}>
                        صورت وضعیت{" "}
                      </C4>
                      <div className="rectHolder"></div>
                      <C1 style={{ color: colors.text.primaryText }}>
                        {project && project?.Cust !== undefined
                          ? Number(project?.Cust).toLocaleString("fa-IR")
                          : "--"}
                      </C1>
                      <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex gap={16} className="grayHolder">
                      <C4 style={{ color: colors.text.secondaryText }}>
                        صورت وضعیت تایید شده
                      </C4>
                      <div className="rectHolder"></div>
                      <C1 style={{ color: colors.text.primaryText }}>
                        {project && project?.Prj_Amount !== undefined
                          ? Number(project?.Prj_Amount).toLocaleString("fa-IR")
                          : "--"}
                      </C1>
                      <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                    </Flex>
                  </Col>
                </Row>
              </Col>
              <Col span={3}>
                <Button
                  color="primary"
                  variant="link"
                  className="flex justify-center items-center"
                >
                  <span>بیشتر</span>
                  <Icons
                    color={colors.icon.icPri}
                    name="BackSingleColor"
                    size={16}
                  />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </CardContainer>
  );
};
