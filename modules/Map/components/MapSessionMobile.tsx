"use client";
import { Col, Flex, Modal } from "antd";
import { FC, useState } from "react";
import { MapContainer } from "../styles/Map.style";
import { useMap } from "../context";
import { IProjectById } from "@/app/actions/models";
import { MapProjectInfo } from "./MapProjectInfo";
import dynamic from "next/dynamic";
import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { FilterModalMobile } from "./FilterModal";
const MapComponent = dynamic(() => import("./Map"), { ssr: false });
export const MapSessionMobile: FC = () => {
  const { setShowFilter, setCurrentProjectImage } = useMap();
  const [projectDetail, setProjectDetail] = useState<
    IProjectById | undefined
  >();
  const showModal = () => {
    setShowFilter(true);
  };
  const {
    theme: { colors },
  } = useTheme();
  return (
    <MapContainer className="mt-[12px]">
      <Col span={24}>
        <Flex justify="space-between" className="!px-[16px] ">
          <span
            className="rounded-[8px] flex items-center justify-center mb-[24px] cursor-pointer transition-all"
            style={{
              background: colors.background.baseBg,
              width: 40,
              height: 40,
            }}
            onClick={() => {
              showModal();
            }}
          >
            <Icons name="Filter" />
          </span>
          {/* <span
            className="  rounded-[8px] flex items-center justify-center mb-[24px] cursor-pointer transition-all"
            style={{
              background: colors.background.baseBg,
              width: 40,
              height: 40,
            }}
            onClick={() => {}}
          >
            <Icons name="Search" />
          </span> */}
        </Flex>
        <MapComponent setProjectDetail={setProjectDetail} />
        <Modal
          open={!!projectDetail}
          onCancel={() => setProjectDetail(undefined)}
          footer={null}
          style={{ top: 8 }}
        >
          <MapProjectInfo
            project={projectDetail}
            onClose={() => {
              setProjectDetail(undefined);
              setCurrentProjectImage(undefined);
            }}
          />
        </Modal>
        <FilterModalMobile />
      </Col>
    </MapContainer>
  );
};
