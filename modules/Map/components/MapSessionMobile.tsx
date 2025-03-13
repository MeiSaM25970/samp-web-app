"use client";
import { Col, Flex, Modal, Spin } from "antd";
import { FC, useState } from "react";
import { MapContainer } from "../styles/Map.style";
import { Filter } from "@/modules/Dashboard/components/Filter";
import { useMap } from "../context";
import { IMapProject, IProjectById } from "@/app/actions/models";
import { MapProjectInfo } from "./MapProjectInfo";
import dynamic from "next/dynamic";
import { breakPointsMd } from "@/constants/screen";
import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { FilterModalMobile } from "./FilterModal";
import MapComponent from "./Map";
// const MapComponent = dynamic(() => import("./Map"), { ssr: false });
export const MapSessionMobile: FC = () => {
  const { setShowFilter } = useMap();
  const [projectDetail, setProjectDetail] = useState<IProjectById | undefined>({
    Prj_ID: "25800",
    Prj_Name: "کانال اب کشاورزی روستای عصر آباد",
    PlanGroup: "آب و خاک کشاورزی",
    Pat_Name: "منابع طبیعی",
    SubjectType: "انتقال آب(کانال )",
    TechnicalType: "احداث",
    ExecuteState: "شروع نشده",
    Province: "اردبيل",
    City: "مشگين شهر",
    Unit: "واحد عملیاتی",
    Prj_SubjectType: 6,
    Prj_ExecuteMethod: 5,
    Prj_ExecuteState: 1,
    Prj_Amount: 1,
    Prj_Unit: 0,
    Prj_AreaCovered: "1",
    Prj_Province: 3,
    Prj_City: "20",
    Prj_AreaComment: "",
    Prj_AreaType: 1,
    Prj_Comment: "مشگين شهر",
    Prj_StartDate: "1402/09/01",
    Prj_FinishDate: "1401/10/10",
    Prj_ContractType: 4,
    Prj_PlanGroup: 3,
    Prj_TechnicalType: 12,
    Prj_Excelphase: "722",
    Percent_Progressed: 80,
    Credit_PishBini: "650000000",
    Takhsis: "1000000000",
    BudjeMosavab: "1000000000",
    Pmap_Lat: 38.39718628,
    Pmap_Long: 47.67258072,
    PhisicalProgress: 80,
    Progressed_Submited: 80,
    Credit_SooratVazeiyat: "0",
    Credit_SooratVazeiyat_TaeidShode: "0",
  });
  const showModal = () => {
    setShowFilter(true);
  };
  const {
    theme: { colors },
  } = useTheme();
  return (
    <MapContainer className="mt-[12px]">
      {/* <Col span={4}>
        <Filter setFilter={setFilter} />
      </Col>
      {projectDetail && (
        <Col span={6}>
          <MapProjectInfo
            project={projectDetail}
            onClose={() => setProjectDetail(undefined)}
          />
        </Col>
      )} */}
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
          <span
            className="  rounded-[8px] flex items-center justify-center mb-[24px] cursor-pointer transition-all"
            style={{
              background: colors.background.baseBg,
              width: 40,
              height: 40,
            }}
            onClick={() => {}}
          >
            <Icons name="Search" />
          </span>
        </Flex>
        {/* <MapComponent setProjectDetail={setProjectDetail} /> */}
        <Modal
          open={!!projectDetail}
          onCancel={() => setProjectDetail(undefined)}
          footer={null}
          style={{ top: 8 }}
        >
          <MapProjectInfo
            project={projectDetail}
            onClose={() => setProjectDetail(undefined)}
          />
        </Modal>
        <FilterModalMobile />
      </Col>
    </MapContainer>
  );
};
