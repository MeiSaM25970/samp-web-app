"use client";
import { Col } from "antd";
import { FC } from "react";
import { MapContainer } from "../styles/Map.style";
import { Filter } from "@/modules/Dashboard/components/Filter";
import { useMap } from "../context";

export const MapSession: FC = () => {
  const { setFilter } = useMap();
  return (
    <MapContainer className="mt-[12px]">
      <Col span={4}>
        <Filter setFilter={setFilter} />
      </Col>
      <Col span={20} className="ps-[10px]"></Col>
    </MapContainer>
  );
};
