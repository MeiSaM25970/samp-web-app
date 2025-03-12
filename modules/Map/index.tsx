"use client";
import { Col, Row } from "antd";
import { FC } from "react";
import { AllProjectsDetails } from "../Dashboard/components/AllProjectDetails";
import { useMap } from "./context";
import { MapSession } from "./components/MapSession";

export const ProjectMap: FC = () => {
  const { projectDetails, loading } = useMap();

  return (
    <Row>
      <Col span={24}>
        <AllProjectsDetails
          projectDetails={projectDetails}
          projectDetailsLoading={loading}
        />
        <MapSession />
      </Col>
    </Row>
  );
};
