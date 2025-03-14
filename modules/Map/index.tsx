"use client";
import { Col, Row, Spin } from "antd";
import { FC, useEffect, useState } from "react";
import { AllProjectsDetails } from "../Dashboard/components/AllProjectDetails";
import { useMap } from "./context";
import { MapSession } from "./components/MapSession";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";
import { AllProjectsDetailsMobile } from "../Dashboard/components/mobile/AllProjectDetail";
import { MapSessionMobile } from "./components/MapSessionMobile";

export const ProjectMap: FC = () => {
  const { projectDetails, loading } = useMap();
  const isMobile = !useMediaQuery({ minWidth: breakPointsMd });
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
    return () => {
      setIsClient(false);
    };
  }, []);

  if (!isClient) {
    return <Spin fullscreen />;
  }
  return (
    <Row>
      <Col span={24}>
        {isMobile ? (
          <>
            <AllProjectsDetailsMobile
              projectDetails={projectDetails}
              projectDetailsLoading={loading}
            />
            <MapSessionMobile />
          </>
        ) : (
          <>
            <AllProjectsDetails
              projectDetails={projectDetails}
              projectDetailsLoading={loading}
            />
            <MapSession />
          </>
        )}
      </Col>
    </Row>
  );
};
