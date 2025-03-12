import { IMapProject } from "@/app/actions/models";
import { useTheme } from "@/app/theme";
import { C1, C4, C7 } from "@/components/UiKit/Typography";
import { Col, Flex, Row } from "antd";
import { FC } from "react";
interface IProps {
  project: IMapProject | undefined;
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
              {project && project?.Prj_TotalCredit !== undefined
                ? Number(project?.Prj_TotalCredit).toLocaleString("fa-IR")
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
              {project && project?.CreditAllocation !== undefined
                ? Number(project?.CreditAllocation).toLocaleString("fa-IR")
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
              {project && project?.Prj_TotalCredit !== undefined
                ? Number(project?.Prj_TotalCredit).toLocaleString("fa-IR")
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
              {project && project?.Cust !== undefined
                ? Number(project?.Cust).toLocaleString("fa-IR")
                : "--"}
            </C1>
            <C7 style={{ color: colors.text.secondaryText }}>ریال</C7>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};
