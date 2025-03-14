"use client";
import { useTheme } from "@/app/theme";
import { C6, C9 } from "@/components/UiKit/Typography";
import { Col, Flex, Row, Spin } from "antd";
import { FC, ReactNode } from "react";

export const ProjectTextMobile: FC<{
  label: ReactNode;
  value: ReactNode;
  hasPrefix?: boolean;
  loading?: boolean;
}> = ({ label, value, hasPrefix = true, loading }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Row gutter={12}>
      <Col span={12}>
        <C6 style={{ color: colors.text.thirdText }}>{label}</C6>
      </Col>
      <Col span={12}>
        <Flex gap={12}>
          <C6>
            {loading ? (
              <Spin size="small" className="mx-[24px]" />
            ) : (
              value || "--"
            )}
          </C6>
          {hasPrefix && (
            <C9 style={{ color: colors.text.secondaryText }}>ریال</C9>
          )}
        </Flex>
      </Col>
    </Row>
  );
};
