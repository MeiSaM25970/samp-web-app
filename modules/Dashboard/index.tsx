"use client";
import { FC } from "react";
import { AllProjectsDetails } from "./components/AllProjectDetails";
import { ProjectList } from "./components/ProjectList";
import { Col, Row } from "antd";
import { useDashboard } from "./context";

const Dashboard: FC = () => {
  const { projectDetails, loading } = useDashboard();
  return (
    <Row>
      <Col span={24}>
        <AllProjectsDetails
          projectDetails={projectDetails}
          projectDetailsLoading={loading}
        />
        <ProjectList />
      </Col>
    </Row>
  );
};
export default Dashboard;
