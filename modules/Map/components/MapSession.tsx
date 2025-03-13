"use client";
import { Col } from "antd";
import { FC, useState } from "react";
import { MapContainer } from "../styles/Map.style";
import { Filter } from "@/modules/Dashboard/components/Filter";
import { useMap } from "../context";
import { IMapProject, IProjectById } from "@/app/actions/models";
import { MapProjectInfo } from "./MapProjectInfo";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("./Map"), { ssr: false });
export const MapSession: FC = () => {
  const { setFilter } = useMap();
  const [projectDetail, setProjectDetail] = useState<IProjectById>();
  return (
    <MapContainer className="mt-[12px]" gutter={12}>
      <Col span={4}>
        <Filter setFilter={setFilter} />
      </Col>
      {projectDetail && (
        <Col span={6}>
          <MapProjectInfo
            project={projectDetail}
            onClose={() => setProjectDetail(undefined)}
          />
        </Col>
      )}
      <Col span={projectDetail ? 14 : 20} className="ps-[10px]">
        <MapComponent setProjectDetail={setProjectDetail} />
      </Col>
    </MapContainer>
  );
};
