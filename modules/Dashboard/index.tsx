"use client";
import { FC } from "react";
import { AllProjectsDetails } from "./components/AllProjectDetails";
import { ProjectList } from "./components/ProjectList";
import { Col, Row } from "antd";
import { useDashboard } from "./context";
import { breakPointsMd } from "@/constants/screen";
import { AllProjectsDetailsMobile } from "./components/mobile/AllProjectDetail";
import { useMediaQuery } from "react-responsive";

const Dashboard: FC = () => {
  const { projectDetails, loading } = useDashboard();
  const isMobile = !useMediaQuery({ minWidth: breakPointsMd });

  return (
    <Row>
      <Col span={24}>
        {isMobile ? (
          <AllProjectsDetailsMobile
            projectDetails={projectDetails}
            projectDetailsLoading={loading}
          />
        ) : (
          <AllProjectsDetails
            projectDetails={projectDetails}
            projectDetailsLoading={loading}
          />
        )}

        <ProjectList />
      </Col>
    </Row>
  );
};
export default Dashboard;
