import { FC } from "react";
import { AllProjectsDetails } from "./components/AllProjectDetails";
import { getFilterOptions } from "@/app/actions";
import { ProjectList } from "./components/ProjectList";
import { Col, Row } from "antd";

const Dashboard: FC = async () => {
  const { data } = await getFilterOptions();
  return (
    <Row>
      <Col span={24}>
        <AllProjectsDetails />
        <ProjectList options={data} />
      </Col>
    </Row>
  );
};
export default Dashboard;
