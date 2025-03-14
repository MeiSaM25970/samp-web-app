"use client";
import { FC, useState } from "react";
import { Button, Col, Divider, Flex, Progress, Row } from "antd";
import { IProject } from "@/app/actions/models";
import { C1, C4, C5, C6, C7, C8, C9, T6 } from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { CardContainer } from "../../styles/card.style";
import { useDashboard } from "../../context";

interface IProps {
  project: IProject | undefined;
}

export const ProjectCardMobile: FC<IProps> = ({ project }) => {
  const {
    theme: { colors },
  } = useTheme();
  const [showMore, setShowMore] = useState<boolean>(false);
  const { setProjectId } = useDashboard();
  return (
    <CardContainer gutter={[0, 24]}>
      <Col span={24}>
        <Flex justify="space-between" align="center" className="!pb-[12px]">
          <T6 style={{ color: colors.text.secondaryText }}>
            {project?.Prj_ID}
          </T6>
          <C9
            className="statusHolder"
            style={{
              color:
                project?.ExecuteState === "شروع نشده"
                  ? colors.chips.text.red
                  : colors.chips.text.green,
              background:
                project?.ExecuteState === "شروع نشده"
                  ? colors.chips.bg.red
                  : colors.chips.bg.green,
              borderColor:
                project?.ExecuteState === "شروع نشده"
                  ? colors.chips.stroke.red
                  : colors.chips.stroke.green,
            }}
          >
            {project?.ExecuteState}
          </C9>
        </Flex>
        {/* <Flex align="center" className="w-full" justify="space-between"> */}
        <Flex align="center" gap={16}>
          <Flex vertical>
            <div
              style={{
                width: 50,
                height: 50,
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
          <Flex gap={8} className="!pl-[24px]" align="center" vertical>
            <T6 style={{ color: colors.text.title }}>{project?.Prj_Name}</T6>
            <Flex gap={8} className="!h-[32px]">
              <C7
                style={{
                  color: colors.text.secondaryText,
                }}
              >
                {project?.Province}
              </C7>
              <div className="rectHolder"></div>
              <C7 style={{ color: colors.text.secondaryText }}>
                {project?.City}
              </C7>
            </Flex>
          </Flex>
        </Flex>
        {/* </Flex> */}
      </Col>
      <Col span={24}>
        <Flex vertical className="w-full">
          <Flex gap={6} vertical className="w-full">
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
          <Flex justify="space-between" className="w-full">
            <C8 style={{ color: colors.text.thirdText }}>
              {project?.Prj_StartDate}
            </C8>
            <C8 style={{ color: colors.text.thirdText }}>
              {project?.Prj_FinishDate}
            </C8>
          </Flex>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex gap={12} vertical>
          <Flex gap={12}>
            <C6
              style={{
                color: colors.text.thirdText,
                width: "65px",
              }}
            >
              طرح :
            </C6>
            <C6
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.PlanGroup}
            </C6>
          </Flex>
          <Flex gap={12}>
            <C6
              style={{
                color: colors.text.thirdText,
                width: "65px",
              }}
            >
              زیر عرصه :
            </C6>
            <C6
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.SubjectType}
            </C6>
          </Flex>
          <Flex gap={12}>
            <C6
              style={{
                color: colors.text.thirdText,
                width: "65px",
              }}
            >
              عرصه :
            </C6>
            <C6
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.Pat_Name}
            </C6>
          </Flex>
          <Flex gap={12}>
            <C6
              style={{
                color: colors.text.thirdText,
                width: "65px",
              }}
            >
              مجری :
            </C6>
            <C6
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.Unit}
            </C6>
          </Flex>
          <Flex gap={12}>
            <C6
              style={{
                color: colors.text.thirdText,
                width: "65px",
              }}
            >
              نوع پروژه :
            </C6>
            <C6
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.TechnicalType}
            </C6>
          </Flex>
        </Flex>
      </Col>
      <Col
        span={24}
        style={{
          maxHeight: showMore ? "500px" : "0px", // مقدار حداکثر ارتفاع
          transition: "max-height 0.3s ease-in-out", // انیمیشن نرم
          overflow: "hidden",
        }}
      >
        <Row align={"bottom"} className="pt-[8px]">
          <Col span={24}>
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Flex gap={4} className="grayHolder" vertical>
                  <C4 style={{ color: colors.text.secondaryText }}>
                    اعتبار پیش بینی شده
                  </C4>
                  <Flex gap={16}>
                    <C1 style={{ color: colors.text.primaryText }}>
                      {project && project?.Prj_TotalCredit !== undefined
                        ? Number(project?.Prj_TotalCredit).toLocaleString(
                            "fa-IR"
                          )
                        : "--"}
                    </C1>
                    <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                  </Flex>
                </Flex>
              </Col>
              <Col span={24}>
                <Flex gap={4} className="grayHolder" vertical>
                  <C4 style={{ color: colors.text.secondaryText }}>
                    اعتبار مصوب
                  </C4>
                  <Flex gap={16}>
                    <C1 style={{ color: colors.text.primaryText }}>
                      {project && project?.CreditAllocation !== undefined
                        ? Number(project?.CreditAllocation).toLocaleString(
                            "fa-IR"
                          )
                        : "--"}
                    </C1>
                    <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                  </Flex>
                </Flex>
              </Col>
              <Col span={24}>
                <Flex gap={4} className="grayHolder" vertical>
                  <C4 style={{ color: colors.text.secondaryText }}>
                    صورت وضعیت
                  </C4>
                  <Flex gap={16}>
                    <C1 style={{ color: colors.text.primaryText }}>
                      {project && project?.Prj_TotalCredit !== undefined
                        ? Number(project?.Prj_TotalCredit).toLocaleString(
                            "fa-IR"
                          )
                        : "--"}
                    </C1>
                    <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                  </Flex>
                </Flex>
              </Col>
              <Col span={24}>
                <Flex gap={4} className="grayHolder" vertical>
                  <C4 style={{ color: colors.text.secondaryText }}>
                    صورت وضعیت تایید شده
                  </C4>
                  <Flex gap={16}>
                    <C1 style={{ color: colors.text.primaryText }}>
                      {project && project?.Cust !== undefined
                        ? Number(project?.Cust).toLocaleString("fa-IR")
                        : "--"}
                    </C1>
                    <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Divider className="!m-0" />
      <Col span={24}>
        <Flex justify="space-between">
          <Button
            color="primary"
            variant="link"
            className="flex justify-center items-center !min-w-[76px]"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <Icons
              color={colors.icon.icPri}
              name={showMore ? "MinimizeSquare" : "MaximizeSquare"}
              size={24}
            />
            <span>اعتبارها</span>
          </Button>
          <Button
            color="primary"
            variant="link"
            className="flex justify-center items-center !min-w-[76px]"
            onClick={() => {
              setProjectId(project?.Prj_ID);
            }}
          >
            <span>بیشتر</span>
            <Icons color={colors.icon.icPri} name="BackSingleColor" size={24} />
          </Button>
        </Flex>
      </Col>
    </CardContainer>
  );
};
