import { Col, Row } from "antd";
import { FC } from "react";
import { AllProjectsDetails } from "./AllProjectDetails";

export const ProjectMap: FC = () => {
  return (
    <Row>
      <Col span={24}>
        <AllProjectsDetails />
      </Col>
    </Row>
  );
};
