"use client";
import { FC } from "react";
import { Col, Flex, Progress, Tabs, TabsProps } from "antd";
import { IMapProject, IProjectById } from "@/app/actions/models";
import { C2, C3, C4, C5, C8, C9, T5, T6 } from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";
import { MapProjectInfoContainer } from "../styles/MapProjectInfo.style";
import { Etebarha } from "./Etebarha";
import Icons from "espil-icons";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectFiles } from "../getData";
import { FilesComponent } from "./Files";

interface IProps {
  project: IProjectById | undefined;
  onClose: () => void;
}

export const MapProjectInfo: FC<IProps> = ({ project, onClose }) => {
  const {
    theme: { colors },
  } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: breakPointsMd });
  const { data: projectFile, isLoading } = useQuery({
    queryKey: ["fetchProjectFiles"],
    enabled: !!project,
    queryFn: async () => {
      const res = await fetchProjectFiles(project?.Prj_ID);
      if (res) return res;
    },
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "اعتبارها",
      children: <Etebarha project={project} />,
    },
    {
      key: "2",
      label: "ساختار شکست",
      children: (
        <div className="projectProgress">
          <C4 className="w-full">{project?.Unit}</C4>
          <Flex gap={6} vertical className="w-full">
            <Flex justify="space-between">
              <C8 style={{ color: colors.text.thirdText }}>میزان پیشرفت :</C8>
              <C5>{project?.Percent_Progressed || 0}%</C5>
            </Flex>
            <Progress
              className="!w-full"
              trailColor="rgb(202, 202, 202)"
              percent={project?.Percent_Progressed}
              type="line"
              status="active"
              showInfo={false}
            />
          </Flex>
          <Flex justify="space-between" className="w-full">
            <C9 style={{ color: colors.text.thirdText }}>وزن :</C9>
            <C5 style={{ color: colors.text.thirdText }}>
              {project?.PhisicalProgress}
            </C5>
          </Flex>
        </div>
      ),
    },
    {
      key: "3",
      label: "فایل ها",
      children: (
        <FilesComponent projectFiles={projectFile} loading={isLoading} />
      ),
    },
  ];
  return (
    <MapProjectInfoContainer>
      <Col span={24}>
        <Flex justify="space-between" className="w-full" align="center">
          <T6 style={{ color: colors.text.secondaryText }}>
            {project?.Prj_ID}
          </T6>
          <Flex gap={8} align="center" className={isMobile ? "!pe-[32px]" : ""}>
            <C9
              className="statusHolder"
              style={{
                color:
                  project?.ExecuteState === "شروع نشده"
                    ? colors.chips.text.red
                    : colors.chips.text.green,
                background:
                  project?.ExecuteState === "شروع نشده"
                    ? colors.chips.bg.red
                    : colors.chips.bg.green,
                borderColor:
                  project?.ExecuteState === "شروع نشده"
                    ? colors.chips.stroke.red
                    : colors.chips.stroke.green,
              }}
            >
              {project?.ExecuteState}
            </C9>
            {!isMobile && (
              <Icons
                name="Close"
                color={colors.icon.icDef}
                onClick={onClose}
                className="cursor-pointer"
              />
            )}
          </Flex>
        </Flex>
      </Col>
      <Col span={24} className="pt-[12px]">
        <Flex gap={16} align="center">
          <div
            style={{
              width: 50,
              height: 50,
              background: "url(/images/project.png)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              borderRadius: 12,
              border: "1px solid var(--Border-Bor-6, #E1E1E1)",
            }}
          >
            {/* <span className="w-[28px] h-[28px] bg-[#CACACA] rounded-[2px] rounded-br-[12px]  absolute right-0 bottom-0 flex justify-center items-center">
              1/5
            </span> */}
          </div>
          <Flex vertical>
            <T5 style={{ color: colors.text.title }}>{project?.Prj_Name}</T5>
            <Flex gap={8} className="!h-[32px]">
              <C3
                style={{
                  color: colors.text.secondaryText,
                }}
              >
                {project?.Province}
              </C3>
              <div className="rectHolder"></div>
              <C3 style={{ color: colors.text.secondaryText }}>
                {project?.City}
              </C3>
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col span={24} className="pt-[24px]">
        <Flex vertical className="w-full">
          <Flex gap={6} vertical>
            <Flex justify="space-between">
              <C8 style={{ color: colors.text.thirdText }}>میزان پیشرفت :</C8>
              <C5>{project?.PhisicalProgress || 0}%</C5>
            </Flex>
            <Progress
              className="!w-full"
              trailColor="rgb(202, 202, 202)"
              percent={project?.PhisicalProgress}
              type="line"
              status="active"
              showInfo={false}
            />
          </Flex>
          <Flex justify="space-between">
            <C8 style={{ color: colors.text.thirdText }}>
              {project?.Prj_StartDate}
            </C8>
            <C8 style={{ color: colors.text.thirdText }}>
              {project?.Prj_FinishDate}
            </C8>
          </Flex>
        </Flex>
      </Col>
      <Col span={24} className="pt-[24px]">
        <Flex gap={12} vertical>
          <Flex gap={12}>
            <C2
              style={{
                color: colors.text.thirdText,
                minWidth: 70,
              }}
            >
              طرح :
            </C2>
            <C2
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.PlanGroup}
            </C2>
          </Flex>
          <Flex gap={12}>
            <C2
              style={{
                color: colors.text.thirdText,
                minWidth: 70,
              }}
            >
              زیر عرصه :
            </C2>
            <C2
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.SubjectType}
            </C2>
          </Flex>
          <Flex gap={12}>
            <C2
              style={{
                color: colors.text.thirdText,
                minWidth: 70,
              }}
            >
              عرصه :
            </C2>
            <C2
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.Pat_Name}
            </C2>
          </Flex>
          <Flex gap={12}>
            <C2
              style={{
                color: colors.text.thirdText,
              }}
            >
              نوع پروژه :
            </C2>
            <C2
              style={{
                color: colors.text.primaryText,
              }}
            >
              {project?.TechnicalType}
            </C2>
          </Flex>
        </Flex>
      </Col>
      <Col span={24} className="pt-[24px]">
        <Tabs defaultActiveKey="1" items={items} centered />
      </Col>
    </MapProjectInfoContainer>
  );
};
