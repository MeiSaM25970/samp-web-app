"use client";
import { IProjectById } from "@/app/actions/models";
import { useTheme } from "@/app/theme";
import { C1, C4, C7 } from "@/components/UiKit/Typography";
import { Col, Flex, Row } from "antd";
import { FC } from "react";
interface IProps {
  project: IProjectById | undefined;
}
export const Etebarha: FC<IProps> = ({ project }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <Flex gap={4} className="grayHolder" vertical>
          <C4 style={{ color: colors.text.secondaryText }}>
            اعتبار پیش بینی شده
          </C4>
          <Flex gap={10}>
            <C1 style={{ color: colors.text.primaryText }}>
              {project && project?.Credit_PishBini !== undefined
                ? Number(project?.Credit_PishBini).toLocaleString("fa-IR")
                : "--"}
            </C1>
            <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
          </Flex>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex gap={4} className="grayHolder" vertical>
          <C4 style={{ color: colors.text.secondaryText }}>اعتبار مصوب </C4>
          <Flex gap={10}>
            <C1 style={{ color: colors.text.primaryText }}>
              {project && project?.BudjeMosavab !== undefined
                ? Number(project?.BudjeMosavab).toLocaleString("fa-IR")
                : "--"}
            </C1>
            <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
          </Flex>
        </Flex>
      </Col>
      <Col span={24}>
        <Flex gap={4} className="grayHolder" vertical>
          <C4 style={{ color: colors.text.secondaryText }}>صورت وضعیت </C4>
          <Flex gap={10}>
            <C1 style={{ color: colors.text.primaryText }}>
              {project && project?.Credit_SooratVazeiyat !== undefined
                ? Number(project?.Credit_SooratVazeiyat).toLocaleString("fa-IR")
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
          <Flex gap={10}>
            <C1 style={{ color: colors.text.primaryText }}>
              {project &&
              project?.Credit_SooratVazeiyat_TaeidShode !== undefined
                ? Number(
                    project?.Credit_SooratVazeiyat_TaeidShode
                  ).toLocaleString("fa-IR")
                : "--"}
            </C1>
            <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};
