"use client";
import { FC } from "react";
import { CardContainer } from "../styles/card.style";
import { Col, Divider, Flex, Progress, Row } from "antd";
import { IProject } from "@/app/actions/models";
import {
  C1,
  C2,
  C3,
  C4,
  C7,
  C8,
  C9,
  T4,
  T5,
  T6,
} from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";

interface IProps {
  project: IProject | undefined;
}
export const ProjectCard: FC<IProps> = ({ project }) => {
  const {
    theme: { colors },
  } = useTheme();
  console.log(project);
  return (
    <CardContainer>
      <Col span={4} className="pl-[40px] !w-[150px]">
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
            <span className="w-[28px] h-[28px] bg-[#CACACA] rounded-[2px] rounded-br-[12px]  absolute right-0 bottom-0 flex justify-center items-center">
              1/5
            </span>
          </div>
        </Flex>
        <Flex gap={6} vertical className="w-[150px]">
          <C8 style={{ color: colors.text.thirdText }}>میزان پیشرفت :</C8>
          <Progress
            className="!w-full"
            trailColor="rgb(202, 202, 202)"
            percent={30}
            type="line"
            // percent={projectDetails?.Percent_Progressed}
            // strokeColor={{
            //   "0%":
            //     projectDetails &&
            //     projectDetails.Percent_Progressed <
            //       projectDetails.Percent_Progressed_Submited
            //       ? colors.icon.icDan
            //       : colors.icon.icSuc,
            //   "100%":
            //     projectDetails &&
            //     projectDetails.Percent_Progressed <
            //       projectDetails.Percent_Progressed_Submited
            //       ? colors.icon.icDan
            //       : colors.icon.icSuc,
            // }}
            status="active"
          />
        </Flex>
        <Flex justify="space-between" className="w-[150px]">
          <C8 style={{ color: colors.text.thirdText }}>1402/02/18</C8>
          <C8 style={{ color: colors.text.thirdText }}>1403/02/15</C8>
        </Flex>
      </Col>
      <Col span={20}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Flex gap={4} align="center" vertical>
              <Flex align="center" className="w-full" justify="space-between">
                <Flex align="center">
                  <Flex gap={12} className="!pl-[24px]" align="center">
                    <T6 style={{ color: colors.text.secondaryText }}>14805</T6>
                    <T4 style={{ color: colors.icon.icDef2 }}>_</T4>
                    <T5 style={{ color: colors.text.title }}>
                      احداث کانال بتنی
                    </T5>
                  </Flex>
                  <Flex gap={8} className="!h-[32px]">
                    <C3
                      style={{
                        color: colors.text.secondaryText,
                      }}
                    >
                      چهارمحال بختیاری
                    </C3>
                    <div className="rectHolder"></div>
                    <C3 style={{ color: colors.text.secondaryText }}>لردگان</C3>
                  </Flex>
                </Flex>
                <C9
                  className="statusHolder"
                  style={{ color: colors.chips.text.green }}
                >
                  اتمام یافته
                </C9>
              </Flex>
              <Row className="w-full" gutter={[0, 12]}>
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
                      آب و خاک (جهاد کشاورزی استان )
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
                      انتقال آب (کانال) کشاورزی
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
                      آبخیز تا جالیز
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
                      احداث
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
                      قرارگاه امام حسین مجتبی
                    </C2>
                  </Flex>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col span={24}>
            <Flex gap={16} className="grayHolder">
              <C4 style={{ color: colors.text.secondaryText }}>
                اعتبار پیش بینی شده
              </C4>
              <div className="rectHolder"></div>
              <C1 style={{ color: colors.text.primaryText }}>
                9,209,200,000,000
              </C1>
              <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
            </Flex>
            <Flex gap={16} className="grayHolder">
              <C4 style={{ color: colors.text.secondaryText }}>اعتبار مصوب </C4>
              <div className="rectHolder"></div>
              <C1 style={{ color: colors.text.primaryText }}>
                9,209,200,000,000
              </C1>
              <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
            </Flex>
            <Flex gap={16} className="grayHolder">
              <C4 style={{ color: colors.text.secondaryText }}>صورت وضعیت </C4>
              <div className="rectHolder"></div>
              <C1 style={{ color: colors.text.primaryText }}>
                9,209,200,000,000
              </C1>
              <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
            </Flex>
            <Flex gap={16} className="grayHolder">
              <C4 style={{ color: colors.text.secondaryText }}>
                صورت وضعیت تایید شده
              </C4>
              <div className="rectHolder"></div>
              <C1 style={{ color: colors.text.primaryText }}>
                9,209,200,000,000
              </C1>
              <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
            </Flex>
          </Col>
        </Row>
      </Col>
    </CardContainer>
  );
};
